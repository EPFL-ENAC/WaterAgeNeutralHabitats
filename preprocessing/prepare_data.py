#!/usr/bin/env python3

"""
This Scripts prepares `/data/preprocessed` folder,
starting from `/data/raw/`

Preprocessing commands to transform raw raster to a colored jpg :
1) Process to convert PCRaster to TIFF :
   `gdal_translate -of GTiff Evap0000.465 raster.tif`

2) Process to colorize (raster > RGB raster)
   `gdaldem color-relief -alpha raster.tif color.txt RGBraster.tif`

3) Process to convert TIFF to JPEG
   `convert RGBraster.tif final_image.jpg`

It transforms as well
+ timeseries.csv to timeseries.json

Destination structure will have same layout as source, with the following exceptions :
+ "Outputs" folders -> unnecessary -> removed
+ raster images are named like : "Evap0000.365"
  jpg resulting will be named like so : "Evap0000365.jpg" (without middle dot)
"""

import os
import glob
import subprocess
import pandas as pd

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "data/raw")
PREPROCESSED_DATA_DIR = os.path.join(PROJ_DIR, "data/preprocessed")
COLORSCALES_DIR = os.path.join(PROJ_DIR, "preprocessing/colorscales")

MAP_PREPROCESS_CMD1 = "gdal_translate -of GTiff {input} {output}"
MAP_PREPROCESS_CMD2 = "gdaldem color-relief -alpha {input} {colorscale} {output}"
MAP_PREPROCESS_CMD3 = "convert {input} {output}"

if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(PREPROCESSED_DATA_DIR, exist_ok=True)

    # Iterate on each landmark, design_strategy, model_setup, map_variable and
    # + transform raw raster to a colored jpg with the 3 steps described in
    #   MAP_PREPROCESS_CMD1, MAP_PREPROCESS_CMD2, MAP_PREPROCESS_CMD3
    # + transform csv timeseries into json with pandas
    for landmark in ("Slabs", "SingleFamilyHousing", "OpenBlocks", "Industry"):
        for design_strategy in ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"):
            for model_setup in ("SIM2",):
                input_dir = os.path.join(
                    DATA_SRC_DIR,
                    f"{landmark}_{design_strategy}_{model_setup}",
                    "Outputs",
                )
                output_dir = os.path.join(
                    PREPROCESSED_DATA_DIR, f"{landmark}_{design_strategy}_{model_setup}"
                )
                tmp_dir = os.path.join(
                    "/tmp", f"{landmark}_{design_strategy}_{model_setup}"
                )

                # Evap0000.465 -> Evap0000.465.jpg
                for map_variable in ("Evap", "PrcL3", "LSrfn", "SWCup"):
                    colorscale = os.path.join(
                        COLORSCALES_DIR, f"cmap_{map_variable}.txt"
                    )

                    raw_files_pattern = os.path.join(
                        input_dir,
                        f"{map_variable}00*",
                    )
                    for raw_file in glob.glob(raw_files_pattern):
                        os.makedirs(output_dir, exist_ok=True)
                        os.makedirs(tmp_dir, exist_ok=True)
                        filename = os.path.split(raw_file)[1]
                        filename_no_dot = filename.replace(".", "")
                        raster_tif = os.path.join(tmp_dir, filename_no_dot + ".tif")
                        raster_rgb_tif = os.path.join(
                            tmp_dir, filename_no_dot + "_RGB.tif"
                        )
                        result_file = os.path.join(output_dir, filename_no_dot + ".jpg")
                        if os.path.exists(result_file):
                            continue

                        print(f"Processing {raw_file} to {result_file}")
                        p = subprocess.run(
                            MAP_PREPROCESS_CMD1.format(
                                input=raw_file, output=raster_tif
                            ),
                            shell=True,
                            stdout=subprocess.PIPE,
                            # stderr=subprocess.PIPE,
                        )
                        if p.returncode != 0:
                            print(f"Error while processing step 1 on {raw_file}")
                            break

                        p = subprocess.run(
                            MAP_PREPROCESS_CMD2.format(
                                input=raster_tif,
                                colorscale=colorscale,
                                output=raster_rgb_tif,
                            ),
                            stdout=subprocess.PIPE,
                            # stderr=subprocess.PIPE,
                            shell=True,
                        )
                        if p.returncode != 0:
                            print(f"Error while processing step 2 on {raster_tif}")
                            break

                        p = subprocess.run(
                            MAP_PREPROCESS_CMD3.format(
                                input=raster_rgb_tif,
                                output=result_file,
                            ),
                            stdout=subprocess.PIPE,
                            # stderr=subprocess.PIPE,
                            shell=True,
                        )
                        if p.returncode != 0:
                            print(f"Error while processing step 3 on {raster_rgb_tif}")
                            break

                # timeseries.csv -> timeseries.json
                try:
                    timeseries_input = os.path.join(input_dir, "timeseries.csv")
                    timeseries_output = os.path.join(output_dir, "timeseries.json")
                    df = pd.read_csv(timeseries_input)
                    # recognize datetime field + format to YYYY-mm-dd
                    df["timestamp"] = pd.to_datetime(df["timestamp"]).dt.strftime(
                        "%Y-%m-%d"
                    )
                    df.to_json(
                        os.path.join(timeseries_output),
                        orient="records",
                        indent=2,
                    )
                except FileNotFoundError:
                    pass

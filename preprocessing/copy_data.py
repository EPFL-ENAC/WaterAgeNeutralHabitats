"""
This script copies selected raw data provided by the researchers (from WANH NAS Storage)
to the data/raw directory of the project.

Destination will have same layout as source, including the "Outputs" folders.
(Since pre-processing script "prepare_data.py" is based on this layout)
"""

import os
import glob
import shutil

HOME_DIR = os.path.expanduser("~")
RAW_DATA_DIR = os.path.join(
    HOME_DIR,
    "ENACdrives",
    "proj-wanhabitats",
    "data_4_visualization",
    "simulations_SIM2",
)
PROJ_DIR = os.path.abspath(f"{__file__}/../..")
OUTPUT_DATA_DIR = os.path.join(PROJ_DIR, "data/raw")

if __name__ == "__main__":

    # Copy summary fluxes CSV
    for src_file in glob.glob(os.path.join(RAW_DATA_DIR, "summary*")):
        filename = os.path.split(src_file)[1]
        dest_file = os.path.join(OUTPUT_DATA_DIR, filename)
        shutil.copy(src_file, dest_file)

    # Copy table fluxes CSV
    os.makedirs(os.path.join(OUTPUT_DATA_DIR, "dictionaries"), exist_ok=True)
    src_file = os.path.join(RAW_DATA_DIR, "dictionaries/table_fluxes.csv")
    dest_file = os.path.join(OUTPUT_DATA_DIR, "dictionaries/table_fluxes.csv")
    shutil.copy(src_file, dest_file)

    # Copy GEOJSONs
    for subject in ("elements", "Panke", "landmarks"):
        # Create dest folder if doesn't exist yet.
        dest_dir = os.path.join(OUTPUT_DATA_DIR, subject)
        os.makedirs(dest_dir, exist_ok=True)

        for src_file in glob.glob(os.path.join(RAW_DATA_DIR, subject, "*.geojson")):
            shutil.copy(src_file, dest_dir)

    # Iterate on simulations directories
    for landmark in ("Slabs", "SingleFamilyHousing", "OpenBlocks", "Industry"):
        for design_strategy in ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"):
            for model_setup in ("SIM2",):

                simulation_dir = os.path.join(
                    RAW_DATA_DIR, f"{landmark}_{design_strategy}_{model_setup}"
                )

                if not os.path.exists(simulation_dir):
                    print(simulation_dir + " does not exist!")
                    continue
                print("starting copying " + simulation_dir + " ...")

                copied_simulation_dir = os.path.join(
                    OUTPUT_DATA_DIR, f"{landmark}_{design_strategy}_{model_setup}"
                )

                # Create simulation dir / Outputs
                if not os.path.exists(copied_simulation_dir):
                    os.makedirs(os.path.join(copied_simulation_dir, "Outputs"))

                # Copy the timeseries
                raw_file = os.path.join(simulation_dir, "Outputs", "timeseries.csv")
                copied_file = os.path.join(
                    copied_simulation_dir, "Outputs", "timeseries.csv"
                )
                shutil.copy(raw_file, copied_file)

                # Copy the maps
                for map_variable in ("Evap", "SWCup", "LSrfn", "PrcL3"):
                    print("... " + map_variable + " ...")

                    maps_files_pattern = os.path.join(
                        simulation_dir,
                        "Outputs",
                        f"{map_variable}0*",
                    )

                    for raw_file in glob.glob(maps_files_pattern):
                        if raw_file.endswith(".asc"):
                            continue
                        filename = os.path.split(raw_file)[1]
                        copied_file = os.path.join(
                            copied_simulation_dir, "Outputs", filename
                        )
                        if os.path.exists(copied_file):
                            continue
                        shutil.copy(raw_file, copied_file)

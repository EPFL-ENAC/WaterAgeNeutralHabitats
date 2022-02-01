"""
This script copies selected raw data provided by the researchers (from WANH NAS Storage)
to the data directory of the project.

Destination will have same layout as source, including the "Outputs" folders.
(Since pre-processing script "prepare_data.py" is based on this layout)
"""

import os
import glob
import shutil

HOME_DIR = os.path.expanduser("~")
RAW_DATA_DIR = os.path.join(
    HOME_DIR, "ENACdrives", "proj-wanhabitats", "data_4_visualization"
)
PROJ_DIR = os.path.abspath(f"{__file__}/../..")
OUTPUT_DATA_DIR = os.path.join(PROJ_DIR, "data/Release1_2022-01")

if __name__ == "__main__":

    for landmark in ("Slabs", "SingleFamilyHousing", "OpenBlocks", "Industry"):
        for design_strategy in ("1", "2", "3", "4", "5", "6"):
            for model_setup in ("R1",):

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
                for map_variable in ("Evap", "SWCup", "LSrfo", "PrcL3"):
                    print("... " + map_variable + " ...")

                    maps_files_pattern = os.path.join(
                        simulation_dir,
                        "Outputs",
                        f"{map_variable}000*",
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

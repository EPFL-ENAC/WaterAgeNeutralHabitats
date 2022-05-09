#!/usr/bin/env python3


"""
This Scripts prepares the colormaps for Legends (in JSON format expected by eCharts)
from `/preprocessing/colorscales/` created in QGIS
to `/data/preprocessed/colormaps/`
"""

import os
import pandas as pd
import json

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "preprocessing/colorscales")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "data/preprocessed/colormaps")

table_fluxes_path = os.path.join(PROJ_DIR, "data/raw/dictionaries/table_fluxes.csv")
tables_fluxes = pd.read_csv(table_fluxes_path)

tables_fluxes.rename({"map_db_ name": "db_name"}, axis=1, inplace=True)
tables_fluxes.set_index("db_name", inplace=True)

if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(DATA_DEST_DIR, exist_ok=True)

    for map_variable in tables_fluxes.index:

        cm_input_file = os.path.join(DATA_SRC_DIR, f"cmap_{map_variable}.txt")
        cm_output_file = os.path.join(DATA_DEST_DIR, f"cmap_{map_variable}.json")
        try:
            cm = pd.read_csv(cm_input_file, header=None, delimiter=",")

            cm_json = {
                "visualMap": {
                    "min": tables_fluxes.loc[map_variable]["colormap_min_value"],
                    "max": tables_fluxes.loc[map_variable]["colormap_max_value"],
                    "text": [
                        (
                            f"{tables_fluxes.loc[map_variable]['map_legend_max_value']}\n"
                            f"{tables_fluxes.loc[map_variable]['map_legend_display_units']}"
                        ),
                        f"{tables_fluxes.loc[map_variable]['map_legend_min_value']}",
                    ],
                    "orient": "horizontal",
                    # // realtime: false,
                    # // calculable: true,
                    "inRange": {
                        "color": [
                            (
                                "rgba("
                                f"{int(color[1])}, "
                                f"{int(color[2])}, "
                                f"{int(color[3])}, "
                                f"{int(color[4])})"
                            )
                            for _, color in cm.iterrows()
                        ]
                    },
                }
            }
            with open(cm_output_file, "w") as f_out:
                json.dump(cm_json, f_out, indent=2)
            print(f"successfully converted cmap for {map_variable}")

        except FileNotFoundError:
            print(f"Could not find file {cm_input_file}, skipping.")

#!/usr/bin/env python3

"""
This Scripts prepares the colormaps (in JSON format expected by eCharts)
from `/preprocessing/colorscales/` provided by Benettin Paolo
to `/frontend/public/data/colormaps/`
"""

import os
import pandas as pd
import json

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "preprocessing/colorscales")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "frontend/public/data/colormaps")

MAP_VARIABLES = [
    {
        # "symbol": "ET", "name": "Evapotranspiration",
        "db_name": "Evap",
        "unit": "mm/d",
        "colormap_min_value": 0,
        "colormap_max_value": 3.46,
    },
    {
        # "symbol": "Q", "name": "Surface runoff",
        "db_name": "LSrfo",
        "unit": "mm/d",
        "colormap_min_value": 0,
        "colormap_max_value": 60,
    },
    {
        # "symbol": "L", "name": "Soil leakage",
        "db_name": "PrcL3",
        "unit": "mm/d",
        "colormap_min_value": 0,
        "colormap_max_value": 20,
    },
    {
        # "symbol": "S", "name": "Water storage",
        "db_name": "SWCup",
        "unit": "-",
        "colormap_min_value": 0,
        "colormap_max_value": 0.2,
    },
]

if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(DATA_DEST_DIR, exist_ok=True)

    print("Going to prepare colormaps")

    for map_variable in MAP_VARIABLES:
        cm_input_file = os.path.join(
            DATA_SRC_DIR, f"cmap_{map_variable['db_name']}.txt"
        )
        cm_output_file = os.path.join(
            DATA_DEST_DIR, f"cmap_{map_variable['db_name']}.json"
        )
        try:
            cm = pd.read_csv(cm_input_file, header=None, delimiter=r"\s+")

            cm_json = {
                "visualMap": {
                    "min": cm.iloc[0][0],
                    "max": cm.iloc[-1][0],
                    "text": [
                        (
                            f"{map_variable['colormap_max_value']} "
                            f"[{map_variable['unit']}]"
                        ),
                        f"{map_variable['colormap_min_value']}",
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
        except FileNotFoundError:
            print(f"Error: could not find file {cm_input_file}")

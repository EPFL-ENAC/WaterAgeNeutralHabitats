#!/usr/bin/env python3

"""
This Scripts prepares the colormaps (in JSON format expected by eCharts)
from `/preprocessing/colorscales/` provided by Benettin Paolo
to `/frontend/public/colormaps/`
"""

import os
import pandas as pd
import json

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "preprocessing/colorscales")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "frontend/public/data/colormaps")

if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(DATA_DEST_DIR, exist_ok=True)

    print("Going to prepare colormaps")

    for map_variable in ("Evap", "PrcL", "LSrfo", "SWCup"):
        cm_input_file = os.path.join(DATA_SRC_DIR, f"cmap_{map_variable}.txt")
        cm_output_file = os.path.join(DATA_DEST_DIR, f"cmap_{map_variable}.json")
        cm = pd.read_csv(cm_input_file, header=None, delimiter=r"\s+")
        cm_json = {
            "visualMap": {
                "min": cm.iloc[0][0],
                "max": cm.iloc[-1][0],
                "text": ["high", "low"],
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

#!/usr/bin/env python3

"""
This Scripts prepares the summary fluxes (in JSON format expected by eCharts)
from single file `/data/raw/Release2_2022-03/summary_fluxes_*.csv` provided by Benettin Paolo
to `/data/preprocessed/summary_fluxes.json/`
"""

import os
import glob
import pandas as pd
import json

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "data/raw/Release2_2022-03")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "data/preprocessed")


if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(DATA_DEST_DIR, exist_ok=True)

    print("Going to prepare summary fluxes")

    sf_input_file = glob.glob(os.path.join(DATA_SRC_DIR, "summary_fluxes_*.csv"))[0]
    sf_output_file = os.path.join(DATA_DEST_DIR, "summary_fluxes.json")
    sf_df = pd.read_csv(sf_input_file, delimiter=",")

    sf_df["tot_permeable"] = (
        sf_df["grass"] + sf_df["shrub"] + sf_df["trees"] + sf_df["gravel"]
    )
    sf_df["tot_Q_by_tot_P"] = sf_df["tot_Q"] / sf_df["tot_P"]

    with open(sf_output_file, "w") as f_out:
        sf_json = {
            "serie": sorted(
                [
                    {
                        "landmark": row["uft"],
                        "scenario": row["map"],
                        "designID": row["strategyID"],
                        "count": row["count"],
                        "tot_P": row["tot_P"],
                        "tot_Q": row["tot_Q"],
                        "tot_ET": row["tot_ET"],
                        "tot_L": row["tot_L"],
                        "f_Q": row["f_Q"],
                        "f_ET": row["f_ET"],
                        "f_L": row["f_L"],
                        "asphalt": row["asphalt"],
                        "building": row["building"],
                        "grass": row["grass"],
                        "gravel": row["gravel"],
                        "pavement": row["pavement"],
                        "shrub": row["shrub"],
                        "trees": row["trees"],
                        "vegroof": row["vegroof"],
                        "tot_permeable": row["tot_permeable"],
                        "tot_Q_by_tot_P": row["tot_Q_by_tot_P"],
                    }
                    for _, row in sf_df.iterrows()
                ],
                key=lambda x: x["scenario"],
                reverse=True,
            )
        }
        json.dump(sf_json, f_out, indent=2)

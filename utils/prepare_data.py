#!/usr/bin/env python3

"""
This Scripts prepares `/frontend/public/data` folder, starting from `/data/`
"""

import os
import shutil
import pandas as pd

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "data")
PUBLIC_DATA_DIR = os.path.join(PROJ_DIR, "frontend/public/data")

if __name__ == "__main__":
    # Create dest folder if doesn't exist yet.
    os.makedirs(PUBLIC_DATA_DIR, exist_ok=True)

    # Copy sample *.jpg files
    for filename in ("Slabs.jpg",):
        shutil.copy(
            os.path.join(DATA_SRC_DIR, filename),
            os.path.join(PUBLIC_DATA_DIR, filename),
        )

    # Prepare data to be plot
    df = pd.read_csv(os.path.join(DATA_SRC_DIR, "timeseries.csv"))
    # recognize datetime field + format to YYYY-mm-dd
    df["timestamp"] = pd.to_datetime(df["timestamp"]).dt.strftime("%Y-%m-%d")
    df.to_json(
        os.path.join(PUBLIC_DATA_DIR, "timeseries.json"),
        orient="records",
        indent=2,
    )

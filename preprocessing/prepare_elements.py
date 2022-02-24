#!/usr/bin/env python3

"""
This Scripts copy the elements files
from `/data/elements/` provided by Charlie
to `/frontend/public/data/elements/`
"""

import os
import glob
import shutil

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "data/elements")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "frontend/public/data/elements")

if __name__ == "__main__":

    # Create dest folder if doesn't exist yet.
    os.makedirs(DATA_DEST_DIR, exist_ok=True)

    print("Going to copy geojson elements files")

    for src_file in glob.glob(os.path.join(DATA_SRC_DIR, "*.geojson")):
        shutil.copy(src_file, DATA_DEST_DIR)

#!/usr/bin/env python3

"""
This Scripts copy the GeoJson files
from `/data/elements/` provided by Charlie
to `/frontend/public/data/elements/`
from `/data/Panke/` provided by Charlie
to `/frontend/public/data/Panke/`
"""

import os
import glob
import shutil

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "data")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "frontend/public/data")

if __name__ == "__main__":

    print("Going to copy geojson files")

    for subject in ("elements", "Panke"):
        # Create dest folder if doesn't exist yet.
        dest_dir = os.path.join(DATA_DEST_DIR, subject)
        os.makedirs(dest_dir, exist_ok=True)

        for src_file in glob.glob(os.path.join(DATA_SRC_DIR, subject, "*.geojson")):
            shutil.copy(src_file, dest_dir)

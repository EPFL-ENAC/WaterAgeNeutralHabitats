#!/usr/bin/env python3

"""
This Scripts copy the GeoJson files
from `/raw_data/elements/` provided by Charlie
to `/data/elements/`
from `/raw_data/Panke/` provided by Charlie
to `/data/Panke/`
from `/raw_data/landmarks/` provided by Charlie
to `/data/landmarks/`
"""

import os
import glob
import shutil

PROJ_DIR = os.path.abspath(f"{__file__}/../..")
DATA_SRC_DIR = os.path.join(PROJ_DIR, "raw_data")
DATA_DEST_DIR = os.path.join(PROJ_DIR, "data")

if __name__ == "__main__":

    print("Going to copy geojson files")

    for subject in ("elements", "Panke", "landmarks"):
        # Create dest folder if doesn't exist yet.
        dest_dir = os.path.join(DATA_DEST_DIR, subject)
        os.makedirs(dest_dir, exist_ok=True)

        for src_file in glob.glob(os.path.join(DATA_SRC_DIR, subject, "*.geojson")):
            shutil.copy(src_file, dest_dir)

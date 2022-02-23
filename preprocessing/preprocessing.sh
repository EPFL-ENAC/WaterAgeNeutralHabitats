#!/usr/bin/sh

# prepare
# - colormaps
preprocessing/prepare_colormaps.py

# prepare
# - raw raster to a colored jpg
# - timeseries.json
preprocessing/prepare_data.py

# prepare
# - geopackage files
preprocessing/prepare_gpkg.py

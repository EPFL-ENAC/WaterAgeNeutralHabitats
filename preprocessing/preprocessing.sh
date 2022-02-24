#!/usr/bin/sh

# prepare
# - colormaps
preprocessing/prepare_colormaps.py

# prepare
# - raw raster to a colored jpg
# - timeseries.json
preprocessing/prepare_data.py

# copy
# - Panke geojson files
# - element geojson files
preprocessing/copy_geojsons.py

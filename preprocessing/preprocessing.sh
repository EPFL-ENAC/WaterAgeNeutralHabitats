#!/usr/bin/sh

# prepare
# - colormaps
preprocessing/prepare_colormaps.py

# prepare
# - summary fluxes for scatterplot
preprocessing/prepare_summary_fluxes.py

# prepare
# - raw raster to a colored jpg
# - timeseries.json
preprocessing/prepare_data.py

# copy
# - Panke geojson files
# - element geojson files
preprocessing/copy_geojsons.py

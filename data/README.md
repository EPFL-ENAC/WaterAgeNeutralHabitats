# WANHabitat data description

The data includes results from numerical simulations for the Water-Age-Neutral Habitats project

## Naming convention

Data is fundamentally organized by simulation. Each simulation is identified by the following naming convention:

*landmarkID*\_*scenarioID*\_*modelsetupID*, where:

- *landmarkID* can be:

  - Slabs, indicating large residential slabs
  - SingleFamilyHousing, indicating small family housing
  - Industry, indicating a small urban industrial area
  - OpenBlocks, indicating open block housing

- *scenarioID* goes from 0 to 6, where 0 is the state of the art and then the "water friendlyness" grows up to 6. Additional virtual scenarios for extreme cases might be considered and they would have id's 10 and 11

- *modelsetupID* indicates the model settings/hypotheses. All simulations are currently run under 'R1', and I foresee a 'R2' with the same data structure and naming but possibly different results

## Data to be shown

We want to show the main simulated water fluxes:

1. overland flow Q
2. evapotranspiration ET
3. deep infiltration L

and some indicator of the water storage:

4. soil water storage S

both as **timeseries** and **animated maps**. Additionally we want to display some simple **summary statistics** (one summary value per simulation).

### Timeseries

All included within the data table `[simulation_name]/Outputs/timeseries.txt`. Such table includes **daily values over 2 years**. The variables that should be shown are called:

- P (cumulative precipitation, units of millimeters [mm]) Note: this is not simulated, but it is a useful reference to display
- ET (cumulative flux value, mm)
- Q (cumulative flux value, mm)
- L (cumulative flux value, mm)
- S (water stored in the rooting zone, mm)

The table also includes the day of simulation (starting from 365 due to a 1-year spinup). This is synchronized with the maps too. There is also a timestamp in the format 'dd-mmm-yyy'.

### Maps

Included within the folder `[simulation_name]/Outputs/`. Such a folder includes all the original PCRaster maps and the maps converted to Esri ASCII raster format (.asc). These maps have spatial resolution 1 meter and size 252x252. However the border is used as a buffer, thus the actual data is 250x250. The reference system is EPSG:25833 (ETRS89 / UTM zone 33N). A map was produced every 5 days, after a spinup period of 364 days.

The naming convention is [variable name][leading zeros to reach 11 characters][day of simulation].asc. For example: `InfA0000870.asc`. The variables that we are potentially interested in are:

- for ET: `Evap`
- for S: [to be decided after looking at `SatDef` or `SWCup`]
- for Q: [to be decided after looking at `LSrfo` or the difference `LSrfo`-`LSrfi`]
- for L: [to be decided after looking at `PrcL3`, `Rchg`]

### Summary Statistics

There is a data table `summary_fluxes_[...].csv`, with some summary results from all simulations. The naming convention within the table is the same. Variables are:

- lmk: landmark (see naming convention above for the values)
- scenario: scenario (see naming convention above for the values)
- count: just a counter
- tot_P: total precipitation over the period [mm]
- tot_Q: total Q over the period [mm]
- tot_ET: total ET over the period [mm]
- tot_L: total L over the period [mm]
- f_Q: ratio (total Q) / (total P) [-]
- f_ET: ratio (total ET) / (total P) [-]
- f_L: ratio (total L) / (total P) [-]
- asphalt: fraction of land cover that is asphalt [-]
- building: fraction of land cover that is building [-]
- grass: fraction of land cover that is grass [-]
- gravel: fraction of land cover that is gravel [-]
- pavement: fraction of land cover that is pavement [-]
- shrub: fraction of land cover that is shrub [-]
- trees: fraction of land cover that is trees [-]

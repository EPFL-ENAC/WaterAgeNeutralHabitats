# Water-Age-Neutral-Habitats

- ENAC-IT4Research
- ECHO
- LAB-U

## Install

```bash
make install
```

## Data pipeline

1. Copy data
   To copy from `ENAC NAS (WANH Collaborative storage)`, the outputs of interest to local data directory in `data/raw` (~32GB)
   /!\ (this pipeline works on OS with posix file system: Linux or MacOS)

```
make copy_data
```

2. Data pre-processing
   Raw Data is expected in `data/raw` folder at the root of this folder (~32GB). It is processed into `data/preprocessed` (~700MB)to files ready to be used by frontend with the 2 following commands :

```bash
make preprocessing_build
make preprocessing_run
```

## Run on my desktop

1. Serve data

```bash
make run-serve-data
```

2. Serve the app

```bash
make run-frontend
```

## Run on server

```bash
make run
```

## Deploy

1. Deploy Data (ENAC-IT4R CDN)

follow steps described [ENAC-IT4R CDN](https://github.com/EPFL-ENAC/enacit4r-cdn)
with `myProjectDataOrDist` = `data/preprocessed/*`

2. Deploy web app on ENAC Server

follow steps described in https://github.com/EPFL-ENAC/enacit-ansible

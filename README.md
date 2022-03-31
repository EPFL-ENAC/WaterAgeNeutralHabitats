# Water-Age-Neutral-Habitats

- ENAC-IT4Research
- ECHO
- LAB-U

## Install

```bash
make install
```

## Data preprocessing

Raw Data is expected in `raw_data` folder at the root of this folder. It is processed to files ready to be used by frontend with the 2 following commands :

```bash
make preprocessing_build
make preprocessing_run
```

## Run on my desktop

1st: serve data :

```bash
make run-serve-data
```

then: serve the app :

```bash
make run-frontend
```

## Run on server

```bash
make run
```

## Deploy on ENAC server

follow steps described in https://github.com/EPFL-ENAC/enacit-ansible

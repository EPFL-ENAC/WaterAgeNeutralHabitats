UID := $(shell id -u)
GID := $(shell id -g)

install:
	$(MAKE) install_backend
	$(MAKE) install_frontend
	poetry run pre-commit install

copy_data:
	poetry run python3 preprocessing/copy_data.py

preprocessing_build:
	$(MAKE) -C preprocessing build

preprocessing_run:
	$(MAKE) -C preprocessing run

lint:
	poetry run pre-commit run --all-files

build: install build_frontend preprocessing_build

install_backend:
	poetry install

install_frontend:
	$(MAKE) -C frontend install

build_frontend:
	$(MAKE) -C frontend build

run-frontend:
	$(MAKE) -C frontend run

run-serve-data:
	cd data/preprocessed && poetry run python -m http.server 8081

# run when deploying on server
setup: preprocessing_build preprocessing_run

run:
	docker-compose build --parallel --pull
	docker-compose up -d --remove-orphans

generate-selfsigned-cert:
	cd cert && OWNER="${UID}.${GID}" docker-compose up --remove-orphans

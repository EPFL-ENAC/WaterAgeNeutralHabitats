install:
	$(MAKE) install_backend
	$(MAKE) install_frontend
	poetry run pre-commit install

preprocessing_build:
	$(MAKE) -C preprocessing build

preprocessing_run:
	$(MAKE) -C preprocessing run

lint:
	poetry run pre-commit run --all-files

build: install build_frontend

install_backend:
	poetry install

install_frontend:
	$(MAKE) -C frontend install

build_frontend:
	$(MAKE) -C frontend build

run-frontend:
	$(MAKE) -C frontend run

# run when deploying on server
setup:
	$(MAKE) preprocessing_run

run:
	docker-compose build --pull
	docker-compose up -d

FROM osgeo/gdal as preprocessing
WORKDIR /app

RUN apt update && \
    apt install -y \
    build-essential curl \
    python3-distutils python3-apt python3-pip \
    imagemagick-6.q16

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 - && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Copy using poetry.lock* in case it doesn't exist yet
COPY ./pyproject.toml ./poetry.lock* /app/

RUN poetry install --no-root --no-dev

CMD ["/usr/bin/sh", "/app/preprocessing/preprocessing.sh"]

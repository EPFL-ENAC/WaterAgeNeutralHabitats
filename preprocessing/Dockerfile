FROM osgeo/gdal as preprocessing
WORKDIR /app

RUN apt update && \
    apt install -y \
    build-essential curl \
    python3-distutils python3-apt python3-pip \
    imagemagick-6.q16

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Copy using poetry.lock* in case it doesn't exist yet
COPY ./pyproject.toml ./poetry.lock* /app/

RUN poetry install --no-root --no-dev

CMD ["/usr/bin/python3", "/app/preprocessing/prepare_data.py"]

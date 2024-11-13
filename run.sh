#!/bin/sh
set -e

if [ ! -d ".venv" ]; then
    echo "Virtual environment not found. Creating one..."
    uv venv -p 3.12 .venv
    echo "Virtual environment created successfully."
    uv pip install -U syftbox --quiet
    # uv pip install -r requirements.txt
else
    echo "Virtual environment already exists."
fi

. .venv/bin/activate

# # run app using python from venv
echo "Running cpu_tracker_leader with $(python3 --version) at '$(which python3)'"
uv run python3 main.py

# # deactivate the virtual environment
deactivate

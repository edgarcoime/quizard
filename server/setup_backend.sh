#!/bin/bash

# Change to the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Function to create virtual environment and install dependencies
setup_environment() {
    if [ ! -d ".virtual" ]; then
        echo "Virtual environment not found. Creating virtual environment..."
        python -m venv .virtual

        if [ $? -ne 0 ]; then
            echo "Error creating virtual environment. Make sure Python is installed."
            exit 1
        fi
    else
        echo "Virtual environment already exists."
    fi

    echo "Activating virtual environment..."
    # Check for OS and activate virtual environment accordingly
    if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
        # For macOS/Linux
        source .virtual/bin/activate
    elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # For Windows (Powershell/cmd)
        .virtual\\Scripts\\activate
    else
        echo "Unsupported OS: $OSTYPE"
        exit 1
    fi

    echo "Installing dependencies..."
    pip install -r requirements.txt

    if [ $? -ne 0 ]; then
        echo "Error installing dependencies. Check your requirements.txt file."
        deactivate
        exit 1
    fi
}

# Function to run the FastAPI app in development mode
run_fastapi() {
    echo "Starting FastAPI app..."
    fastapi dev main.py --port 8000
}

# Main script execution
setup_environment
run_fastapi

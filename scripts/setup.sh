#!/bin/bash

# Get the current working directory
script_path=$(dirname "$(readlink -f "$0")")
root_dir=$script_path/..

# Run npm install in backend folder
# echo "Running npm install in backend folder..."
# cd "$root_dir/backend"
# npm install

# Run npm install in paper folder
echo "Running npm install in paper folder..."
cd "$root_dir/paper"
npm install
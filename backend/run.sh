#!/bin/bash

# Exit on error
set -e

# Install bun if it's not installed
if ! [ -x "$(command -v bun)" ]; then
  echo "bun not found. Installing bun..."
  curl -fsSL https://bun.sh/install | bash
  export BUN_INSTALL="/root/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"
  echo "bun installed successfully."
fi

# Install dependencies
echo "Installing dependencies..."
bun install --frozen-lockfile

# Build the application
echo "Building the application..."
bun run build

# Run the application
echo "Running the application..."
bun run start:prod

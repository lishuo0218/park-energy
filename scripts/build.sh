#!/usr/bin/env bash
# 构建/打包脚本
set -e

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running tests..."
python -m pytest tests/ -v

echo "Build done."

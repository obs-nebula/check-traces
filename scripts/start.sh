#!/usr/bin/env bash

#: Description : Downloads and start OTELCOL.

# Checks if otelcol exists
if [ ! -f "otelcol_0.75.0_linux_amd64.tar.gz" ]
then 
  # If not, then downloads it. 
  wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.75.0/otelcol_0.75.0_linux_amd64.tar.gz
fi
# Extracts and creates an executable with the name `otelcol`
tar xf otelcol_0.75.0_linux_amd64.tar.gz otelcol
# Starts otelcol in background with the given configuration file
./otelcol --config=file:otel-collector-config.yaml &
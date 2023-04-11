if [ ! -f "otelcol_0.75.0_linux_amd64.tar.gz" ]
then 
  wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.75.0/otelcol_0.75.0_linux_amd64.tar.gz
fi

tar xf otelcol_0.75.0_linux_amd64.tar.gz otelcol
./otelcol --config=file:otel-collector-config.yaml &
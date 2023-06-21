# check-traces

[![ci](https://github.com/obs-nebula/check-traces/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/obs-nebula/check-traces/actions/workflows/ci.yml)

> OTEL-JS packages in use:

| Package |  |
| ----------- | ----------- |
| @opentelemetry/exporter-trace-otlp-http | To export to OTELCOL via OTLP/HTTP |
| @opentelemetry/exporter-metrics-otlp-http | Metrics exporter via OTLP/HTTP   |
| @opentelemetry/instrumentation-express | Express auto-instrumentation plugin |
| @opentelemetry/instrumentation-http | Required to be used with `@opentelemetry/instrumentation-express` |
| @opentelemetry/resources | To be used with `semantic-conventions` to identify the application/service's name |
| @opentelemetry/sdk-node | For automatic instrumentation |
| @opentelemetry/semantic-conventions | To be used with `resources` to identify the application/service's name |

The purpose of this repository is to ensure that a basic Express app's traces are correctly generated and successfully exported to the final destination which is the OpenTelemetry collector.

With this, we can make safer modifications and experiments according to the evolution of the APIs of the OTEL-JS modules.

## How to run

```shell
# This will download and start OTELCOL
./scripts/start.sh

# Start the example
npm install
npm run build
npm start
```
### Test

```shell
# Create some spans
curl -v http://localhost:8080
# Check the results
curl -s http://localhost:8888/metrics
```
### Stop the application and OTELCOL

```shell
killall node
./scripts/stop.sh
```

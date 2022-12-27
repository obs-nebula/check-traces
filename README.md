# check-traces

[![ci](https://github.com/obs-nebula/check-traces/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/obs-nebula/check-traces/actions/workflows/ci.yml)


The purpose of this repository is to ensure that a basic Express app's traces are correctly generated and successfully exported to the final destination which is Jaeger.

With this, we can make safer modifications and experiments according to the evolution of the APIs of the OTEL-JS modules.

## How to run locally

```console
# (Optional) You can use this environment variable to point to another Jaeger traces endpoint.
OTEL_EXPORTER_JAEGER_ENDPOINT=http://localhost:14268/api/traces

# This will download and start Jaeger
./scripts/start.sh

# Start the example
npm install
npm start
```

* Go to [localhost:8080](http://localhost:8080)
* Check the result in Jaeger UI [localhost:16686](http://localhost:16686)

![jaegerUI](img.png)

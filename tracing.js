const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const opentelemetry = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('./node_modules/@opentelemetry/exporter-trace-otlp-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name
});

const exporter = new OTLPTraceExporter();

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  resource: resource,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
});

try {
  sdk.start();
} catch (error) {
  console.error(error);
}

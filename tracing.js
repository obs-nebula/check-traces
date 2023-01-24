const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const opentelemetry = require('@opentelemetry/sdk-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name
});

const exporter = new JaegerExporter();

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  resource: resource,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
});

(async () => {
  try {
    await sdk.start();
  } catch (error) {
    console.error(error);
  }
})();

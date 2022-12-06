
// Resources and semantic conventions.
// https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-resources#opentelemetry-resources-util
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Node auto instrumentation package.
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');

// Instrumentation
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// Exporter
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// Auto instrumentation packages
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name
});

const exporter = new JaegerExporter();

const provider = new NodeTracerProvider({ resource: resource });

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
  tracerProvider: provider
});

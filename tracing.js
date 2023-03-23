const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { OTLPTraceExporter } = require('./node_modules/@opentelemetry/exporter-trace-otlp-http');

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name
});

const provider = new NodeTracerProvider({ resource: resource });

const exporter = new OTLPTraceExporter();

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ],
  tracerProvider: provider
});

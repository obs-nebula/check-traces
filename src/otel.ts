// Let's keep this in case needed in the future.
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

import { NodeSDK, metrics } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { error } from 'console';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

// Let's keep this in case needed in the future.
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name,
});

const metricsExporter = new OTLPMetricExporter();

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new metrics.PeriodicExportingMetricReader({
    exporter: metricsExporter,
    exportIntervalMillis: 3000,
  }),
  autoDetectResources: true,
  resource: resource,
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

try {
  sdk.start();
} catch (err) {
  error(err);
}

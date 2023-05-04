import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { error } from 'console';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name,
});

const metricsExporter = new OTLPMetricExporter();

const meterProvider = new MeterProvider({ resource: resource });
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({ exporter: metricsExporter })
);
meterProvider.getMeter(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.npm_package_name!,
  process.env.npm_package_version
);

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricsExporter,
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

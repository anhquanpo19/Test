import client from "prom-client";

const httpRequestTimer = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in microseconds",
  labelNames: ["method", "route", "code", "sys_message", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5, 10],
});

const app =
  process.env.NODE_ENV + "_" + "test";

const Registry = client.Registry;
const register = new Registry();
register.setDefaultLabels({ app });
register.registerMetric(httpRequestTimer);

client.collectDefaultMetrics({ register });

export { httpRequestTimer, register };

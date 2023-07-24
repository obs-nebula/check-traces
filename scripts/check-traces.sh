#!/usr/bin/env bash

#: Description : Basic test to verify if the OTELCOL received the generated spans.

# There is a possibility to remove this `sleep` command, some tests
# could be done to try to simplify this.
sleep 5

# Retrieve the number of accepted spans from the metrics endpoint of the OTELCOL.
# The 'curl' command fetches the metrics page silently (-s) from http://localhost:8888/metrics.
# The 'grep' command filters the output to find the line containing `otelcol_receiver_accepted_spans{`.
# The 'cut' command then extracts the second field (the value of the metric) from that line.
# The extracted value is stored in the variable 'N' for further use in the script.
N=$(curl -s http://localhost:8888/metrics | grep "otelcol_receiver_accepted_spans{" | cut -d ' ' -f 2)

# When creating spans via `create-trace.sh` script, it is expected to create 4 spans.
# So we need to check if the number of spans are the same.
if [ $N -eq 4 ];
then
  echo "Spans found"
  exit 0
else
  echo "Spans not found"
  exit 1
fi

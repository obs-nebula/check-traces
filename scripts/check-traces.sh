N=$(curl -s http://localhost:8888/metrics | grep "otelcol_receiver_accepted_spans{" | cut -d ' ' -f 2)
if [ $N -eq 4 ];
then
  echo "Spans found"
  exit 0
else
  echo "Spans not found"
  exit 1
fi

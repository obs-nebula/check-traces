if curl -s http://localhost:14269/metrics | grep "check-traces" 
then
  echo "Traces found"
  exit 0
else
  echo "Traces not found"
  exit 1
fi

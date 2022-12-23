if [ ! -f "jaeger-1.40.0-linux-amd64.tar.gz" ]
then 
  wget https://github.com/jaegertracing/jaeger/releases/download/v1.40.0/jaeger-1.40.0-linux-amd64.tar.gz
fi

tar xf jaeger-1.40.0-linux-amd64.tar.gz
./jaeger-1.40.0-linux-amd64/jaeger-all-in-one &
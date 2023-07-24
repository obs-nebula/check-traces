#!/usr/bin/env bash

#: Description : Basic trace creation by accessing the application.

# There is a possibility to remove this `sleep` command, some tests
# could be done to try to simplify this.
sleep 1
curl http://localhost:8080

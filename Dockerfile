# Use a lightweight base image
FROM alpine:latest

# Set a working directory
WORKDIR /app

# Create a simple shell script to echo "Hello, World!"
RUN echo '#!/bin/sh' > hello.sh && \
    echo 'echo "Hello, World!"' >> hello.sh && \
    chmod +x hello.sh

# Set the default command to run when the container starts
CMD ["/app/hello.sh"]

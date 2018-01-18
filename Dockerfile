# This image is based on the popular Alpine Linux project, available in 
# the alpine official image. Alpine Linux is much smaller than most 
# distribution base images (~5MB), and thus leads to much slimmer images in general.
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Make port 4000 available to the world outside this container
EXPOSE 4000

RUN npm install webpack -g
RUN npm install http-server -g

CMD webpack

CMD http-server bin -p 4000
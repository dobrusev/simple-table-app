# This image is based on the popular Alpine Linux project, available in 
# the alpine official image. Alpine Linux is much smaller than most 
# distribution base images (~5MB), and thus leads to much slimmer images in general.
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Make port 8080 available to the world outside this container
EXPOSE 8080

RUN npm install

CMD npm start
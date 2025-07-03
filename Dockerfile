# Use a lightweight web server base image
FROM nginx:alpine

# Copy your app files to the Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# nanti di cmd tinggal gini
# docker-compose up --build

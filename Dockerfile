
FROM node:12 AS build-stage

#set the working directory
WORKDIR /frontend

#copy the package and package lock files
#from local to container work directory /app
COPY package*.json /app/

#Run command npm install to install packages
RUN npm install

#copy all the folder contents from local to container
COPY . .

#create a react production build
RUN npm run build

FROM nginx

#we copy the output from first stage that is our react build
#into nginx html directory where it will serve our index file
COPY --from=build-stage /frontend/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
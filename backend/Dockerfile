#Using base image node, version 9
FROM node:9

#Working in /backend directory
WORKDIR /backend

#Copying package.json file first so docker does not have reinstall dependencies
COPY package.json /backend

#Running npm install command
RUN npm i

#Copying the rest of current directory to backend directory in image
COPY . /backend

#Command for starting the app
CMD npm start

#Opening the port for node outside the container
EXPOSE 9000



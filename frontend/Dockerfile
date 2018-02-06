#Using base image node, version 9
FROM node:9

#Working in /frontend directory
WORKDIR /frontend

#Copying package.json file first so docker does not have reinstall dependencies
COPY package.json /frontend

#Running npm install command
RUN npm i

#Copying the rest of current directory to frontend directory in image
COPY . /frontend

#Command for starting the app
CMD npm start

#Opening the port for node outside the container
EXPOSE 8000



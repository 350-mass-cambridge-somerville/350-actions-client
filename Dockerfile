# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR .

# add `/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm install -g serve

# start app
CMD ["npm", "run", "docker:start"]
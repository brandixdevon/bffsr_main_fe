# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /

ADD ./package.json ./package.json

ADD . / 

# start app
CMD ["npm", "start"]

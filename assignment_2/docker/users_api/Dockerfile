FROM node:14
WORKDIR /users_doc
COPY package.json /users_doc//
RUN npm install
COPY . /users_doc//
CMD ["node","users_api.js"]
EXPOSE 8001
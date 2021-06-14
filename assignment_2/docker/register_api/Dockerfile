FROM node:14
WORKDIR /register_doc
COPY package.json /register_doc/
RUN npm install
COPY . /register_doc/
CMD ["node","register_api.js"]
EXPOSE 8001
FROM node:14
WORKDIR /login_doc
COPY package.json /login_doc
RUN npm install
COPY . /login_doc
CMD ["node","login_api.js"]
EXPOSE 8001
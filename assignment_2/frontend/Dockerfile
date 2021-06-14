FROM node:14
WORKDIR /frontendapp
COPY package.json /frontendapp
RUN npm install
RUN npm install react-scripts@4.0.3
RUN npm install jquery popper.js
COPY . /frontendapp
CMD ["npm", "start"]
EXPOSE 3000

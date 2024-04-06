FROM node

WORKDIR /CLIENT

COPY package.json /CLIENT

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
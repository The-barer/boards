FROM node

WORKDIR /CLIENT

COPY package.json /CLIENT

RUN npm install

COPY . .

ENV VITE_APP_DEV_MODE=false

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
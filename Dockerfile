FROM node

WORKDIR /CLIENT

COPY package.json /CLIENT

RUN npm install

COPY . .

ARG VITE_API_ENDPOINT

ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
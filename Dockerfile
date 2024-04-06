FROM node

WORKDIR /CLIENT

COPY package.json /CLIENT

RUN npm install

COPY . .

ARG APP_HOST
ARG API_ENDPOINT
ARG VK_CLIENT_ID
ARG GOOGLE_CLIENT_ID

ENV VITE_APP_HOST=$APP_HOST
ENV VITE_API_ENDPOINT=$API_ENDPOINT
ENV VITE_VK_CLIENT_ID=555555
ENV VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV VITE_APP_DEV_MODE=false

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
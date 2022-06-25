FROM node:14.16.1-alpine

WORKDIR /app/my_application

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
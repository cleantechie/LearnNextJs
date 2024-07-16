FROM node:22.4.1
WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build


EXPOSE 3000
# Command to run your app
CMD ["npm", "start"]
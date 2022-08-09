FROM node:16-alpine

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# RUN node start index.js
# COPY /common/config.yml ./

EXPOSE 5000

#CMD ["node", "dist/app.js"]
CMD ["npm", "start"]

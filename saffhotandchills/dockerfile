FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build Vite app
RUN npm run build

ENV PORT=9000

EXPOSE 9000

# Serve built files with 'serve'
CMD ["npx", "serve", "-s", "dist", "-l", "9000"]

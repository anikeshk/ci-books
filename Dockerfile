# Use official Node.js image as base
FROM node:20

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port for the server
EXPOSE 5000

# Start the server
CMD ["node", "./dist/index.js"]

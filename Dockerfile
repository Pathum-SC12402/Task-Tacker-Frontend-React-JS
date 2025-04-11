# Use Node.js Alpine image for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files to install dependencies first (cache-friendly)
COPY package*.json ./

# Install dependencies while ignoring peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite development server (make sure --host is set in package.json)
CMD ["npm", "run", "dev"]

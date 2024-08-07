# Use the Node.js 20.13.1 image as the base
FROM node:20.13.1

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install project dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

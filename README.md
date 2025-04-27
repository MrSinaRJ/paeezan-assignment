[![CI](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/ci.yml/badge.svg)](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/ci.yml)    [![Docker Image Build and Push](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/docker.yml/badge.svg)](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/docker.yml)    [![Hamravesh Build and Deploy](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/hamravesh.yml/badge.svg)](https://github.com/MrSinaRJ/paeezan-assignment/actions/workflows/hamravesh.yml)    [![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/1woqm.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

# Paeezan Assignment - Phone Number to Words Transformer API

A NestJS-based API that transforms phone numbers into word combinations using the old keypad style input.

## Project Overview

This API service transforms input phone numbers (consisting of digits 2-9) into all possible letter combinations according to the traditional phone keypad mapping:

```
2: abc
3: def
4: ghi
5: jkl
6: mno
7: pqrs
8: tuv
9: wxyz
```

## Features

- RESTful API with NestJS
- API versioning support
- Swagger documentation
- Input validation
- Docker support
- CI/CD integration (GitHub Actions)
- Comprehensive testing

## Requirements

- Node.js (LTS version recommended)
- Yarn package manager
- Docker (optional, for containerized deployment)

## Installation and Setup

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/MrSinaRJ/paeezan-assignment.git
cd paeezan-assignment
```

2. Install dependencies:

```bash
yarn install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
yarn start:dev
```

The application will be available at http://localhost:3000 by default.

### Environment Variables

| Variable     | Description          | Default              |
| ------------ | -------------------- | -------------------- |
| APP_NAME     | Application name     | "Paeezan Assignment" |
| APP_VERSION  | Application version  | "0.0.1"              |
| PORT         | HTTP port            | 3000                 |
| NODE_ENV     | Environment          | "development"        |
| CORS_ORIGIN  | CORS allowed origins | "*"                  |
| CORS_METHODS | CORS allowed methods | "GET, POST"          |

## API Documentation

The API documentation is generated using Swagger and is available at `/api/docs` endpoint.

### Endpoints

#### Health Check

```
GET /health
```

Returns the current server timestamp to confirm the API is operational.

Response:
```json
{
  "checked": "2025-04-27T10:00:00.000Z"
}
```

#### Generate Combinations (v1)

```
POST /combinations
version: 1 (in header)
```

Generates all possible letter combinations for a given phone number.

### Request And Response Format

#### Request Body Format

```json
{
  "phoneNumber": "28"
}
```

#### Response Format

```json
{
  "combinations": [
    "at",
    "au",
    "av",
    "bt",
    "bu",
    "bv",
    "ct",
    "cu",
    "cv"
  ]
}
```

## Deployment Options

### Standalone Server Deployment

1. Clone the repository:

```bash
git clone https://github.com/MrSinaRJ/paeezan-assignment.git
cd paeezan-assignment
```

2. Install production dependencies:

```bash
yarn install --production
```

3. Build the application:

```bash
yarn build
```

4. Set environment variables or create a `.env` file.

5. Start the server:

```bash
yarn start:prod
```

### Docker Deployment

1. Build the Docker image:

```bash
docker build -t paeezan-assignment .
```

2. Run the container:

```bash
docker run -p 3000:3000 \
  -e APP_NAME="Paeezan Assignment" \
  -e APP_VERSION="0.0.1" \
  -e PORT="3000" \
  -e NODE_ENV="production" \
  -e CORS_ORIGIN="*" \
  -e CORS_METHODS="GET, POST" \
  paeezan-assignment
```

Alternatively, you can use a `.env` file:

```bash
docker run -p 3000:3000 --env-file .env paeezan-assignment
```

#### Using Pre-built Docker Image

You can also pull the pre-built Docker image from Docker Hub:

```bash
docker pull mrsinarj/paeezan-assignment:latest
docker run -p 3000:3000 --env-file .env mrsinarj/paeezan-assignment:latest
```

### CI/CD

This project includes GitHub Actions workflows for:

1. Building and pushing Docker images
2. Deployment to Hamravesh hosting

## Testing

Run unit tests:

```bash
yarn test
```

Generate test coverage report:

```bash
yarn test:cov
```
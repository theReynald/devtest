# Loop Sample - Cloud Version

This is a cloud-ready version of the TypeScript loop sample. It can be deployed to various cloud platforms including AWS Lambda, Azure Functions, or as a containerized application.

## Original Sample

The original sample (`loop_sample.ts`) demonstrates:
- Simple for loops with array iteration
- While loops for countdown operations
- Basic console logging

## Cloud Versions

### 1. AWS Lambda Deployment

The `lambda.ts` file provides an AWS Lambda-compatible handler.

#### Deployment with Serverless Framework

```bash
# Install dependencies
npm install

# Install Serverless Framework globally (if not already installed)
npm install -g serverless

# Install serverless plugins
npm install --save-dev serverless-plugin-typescript

# Build the project
npm run build

# Deploy to AWS
serverless deploy --stage dev

# Invoke the function
serverless invoke -f loopSample --data '{"operation": "both", "start": 5}'
```

#### Manual AWS Lambda Deployment

1. Build the project: `npm run build`
2. Zip the `dist` folder and `node_modules`
3. Upload to AWS Lambda
4. Set handler to `dist/lambda.handler`
5. Configure runtime to Node.js 18.x

### 2. Azure Functions Deployment

The `azure-function/` directory contains Azure Functions configuration.

```bash
# Install Azure Functions Core Tools (if not already installed)
npm install -g azure-functions-core-tools@4

# Install dependencies
npm install

# Add Azure Functions dependencies
npm install @azure/functions

# Build the project
npm run build

# Run locally
func start

# Deploy to Azure
func azure functionapp publish <YOUR_FUNCTION_APP_NAME>
```

### 3. Docker Deployment

The application can be run in a container for deployment to any cloud platform that supports Docker.

#### Build and run with Docker

```bash
# Build the Docker image
docker build -t loop-sample-cloud .

# Run the container
docker run --rm loop-sample-cloud
```

#### Using Docker Compose

```bash
# Start the service
docker-compose up

# Stop the service
docker-compose down
```

### 4. Kubernetes Deployment

For Kubernetes deployment:

```bash
# Build and tag the image
docker build -t loop-sample-cloud:1.0.0 .

# Push to your container registry
docker tag loop-sample-cloud:1.0.0 <your-registry>/loop-sample-cloud:1.0.0
docker push <your-registry>/loop-sample-cloud:1.0.0

# Deploy to Kubernetes
kubectl apply -f k8s-deployment.yml
```

## API Usage

### AWS Lambda / Azure Functions

The cloud functions accept the following parameters:

**Request:**
```json
{
  "operation": "both|sum|countdown",
  "start": 5
}
```

**Response:**
```json
{
  "message": "Loop operations completed successfully",
  "results": {
    "sumOperation": {
      "edits": [0, 1, 2, 3, 4],
      "total": 10,
      "logs": ["edit=0", "edit=1", "edit=2", "edit=3", "edit=4", "sum(edits)=10"]
    },
    "countdownOperation": {
      "start": 5,
      "logs": ["countdown=5", "countdown=4", "countdown=3", "countdown=2", "countdown=1", "countdown=0", "countdown complete"]
    }
  }
}
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run the original sample
npm run dev

# Build TypeScript
npm run build

# Run the built version
npm start
```

### Testing

The cloud versions return structured JSON responses instead of console output, making them suitable for API integrations and cloud monitoring.

## Environment Variables

- `NODE_ENV`: Set to `production` for production deployments
- For AWS: Configure via Lambda environment variables
- For Azure: Configure via Application Settings

## Cost Optimization

All cloud deployments are configured for cost optimization:
- AWS Lambda: 256MB memory, 30s timeout
- Azure Functions: Consumption plan compatible
- Docker: Multi-stage build for minimal image size
- Kubernetes: Configured for auto-scaling

## Security

- AWS Lambda: Uses IAM roles for authentication
- Azure Functions: Requires function key for access
- Docker: Runs as non-root user where possible
- All deployments use HTTPS/TLS for data in transit

## Monitoring

- AWS Lambda: CloudWatch Logs integration
- Azure Functions: Application Insights integration
- Docker: Health checks configured
- Kubernetes: Liveness and readiness probes

## License

Same as the original sample.

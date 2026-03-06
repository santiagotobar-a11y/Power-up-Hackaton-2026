#!/bin/bash
set -e

echo "Creating deployment package with images..."
rm -f deploy.zip
zip -q deploy.zip index.html *.png

echo "Creating Amplify deployment..."
DEPLOY_JSON=$(aws amplify create-deployment \
  --app-id d8o4hckwicqvc \
  --branch-name main \
  --region us-west-2 \
  --profile hackathon)

ZIP_URL=$(echo "$DEPLOY_JSON" | jq -r '.zipUploadUrl')
JOB_ID=$(echo "$DEPLOY_JSON" | jq -r '.jobId')

echo "Uploading to S3..."
curl -X PUT "$ZIP_URL" --upload-file deploy.zip -H "Content-Type: application/zip"

echo "Starting deployment..."
aws amplify start-deployment \
  --app-id d8o4hckwicqvc \
  --branch-name main \
  --job-id "$JOB_ID" \
  --region us-west-2 \
  --profile hackathon

echo "Deployment started! Job ID: $JOB_ID"
echo "Check status in a few seconds with:"
echo "aws amplify get-job --app-id d8o4hckwicqvc --branch-name main --job-id $JOB_ID --region us-west-2 --profile hackathon"

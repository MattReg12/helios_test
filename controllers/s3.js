import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
});

const bucketName = process.env.S3_BUCKET_NAME;

export async function uploadFile(fileContent, key) {
  const params = {
    Bucket: bucketName,
    Key: key, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'json', // Change according to your file type
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully to S3 at ${data.Location}`);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
  }
}

export async function downloadFile(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    console.log('File downloaded to S3 successfully:', data.Body.toString());
    return data.Body;
  } catch (error) {
    console.error('Error downloading file from S3:', error);
  }
}

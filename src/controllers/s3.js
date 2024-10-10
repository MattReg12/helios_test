import AWS from 'aws-sdk'

// Provides functionality to interact with the redis database. 
class S3 {
  constructor() {
    this.connection = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION
    })
    this.bucketName = process.env.S3_BUCKET_NAME
  }
  // Add a file to S3
  async addFile(fileName, fileContent) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: JSON.stringify(fileContent),
      ContentType: 'json',
    };

    try {
      const data = await this.connection.upload(params).promise();
      console.log(`File uploaded successfully to S3 at ${data.Location}`);
      return data.Location;
    } catch (error) {
      console.error('Error uploading file to S3:', error.message);
    }
  }
  // grab a file to S3
  async getFile(fileName) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };
  
    try {
      const data = await this.connection.getObject(params).promise();
      console.log('File downloaded to S3 successfully:', data.Body.toString());
      return data.Body;
    } catch (error) {
      console.error('Error downloading file from S3:', error.message);
    }
  }  
}

export default S3

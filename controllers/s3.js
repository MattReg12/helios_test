import AWS from 'aws-sdk'

class S3 {
  constructor() {
    this.connection = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION
    })
    this.bucketName = process.env.S3_BUCKET_NAME
  }

  async addFile(key, fileContent) {
    const params = {
      Bucket: this.bucketName,
      Key: key, // File name you want to save as in S3
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

  async getFile(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
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

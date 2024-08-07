const path = require('path');
const { promisify } = require('util');
import aws from 'aws-sdk';
import { exec } from 'child_process';

const execAsync = promisify(exec);

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `backups/${path.basename(filePath)}`,
    Body: fileContent,
  };

  try {
    await s3.upload(params).promise();
    fs.unlinkSync(filePath); // Delete the file after upload
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

const backupDatabase = async () => {
    const dbUrl = process.env.POSTGRES_URL;
    const backupFile = `/tmp/verceldb_backup_${Date.now()}.dump`;
  
    const command = `pg_dump "${dbUrl}" -F c -b -v -f ${backupFile}`;
  
    try {
      await execAsync(command);
      const s3Url = await uploadToS3(backupFile);
      return s3Url;
    } catch (error) {
      console.error('Error creating database backup:', error);
      throw error;
    }
  };

module.exports = backupDatabase;

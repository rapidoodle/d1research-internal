import aws from 'aws-sdk';
import { NextResponse } from 'next/server';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadFile({ buffer, name }) {
    try {

      const checkParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: name,
      };


      try {
        await s3.headObject(checkParams).promise();
        // If headObject does not throw an error, the file exists
        return NextResponse.json({ message: 'File already exists' }, { status: 400 });
      } catch (headErr) {
        if (headErr.code !== 'NotFound') {
          throw headErr;
        }
        // If headObject throws a NotFound error, the file does not exist
      }

        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: name,
            Expires: 60,
            Body: buffer,
            ContentType: 'application/octet-stream',
            ACL: 'private',
        };

        const uploadURL = await s3.putObject(uploadParams).promise();
        console.log('uploadURL: ', uploadURL);
        return NextResponse.json({ message: 'File uploaded to AWS s3 bucket' }, { status: 500 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to generate upload URL' }, { status: 500 });
    }
}


import S3 from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';
import { EntityType } from '../../configs/global.config';
import { S3BucketConfig } from '../../configs/s3.config';
import { generateBucketKey } from '../../utils/generateBucketKey';

const s3 = new S3({
  region: S3BucketConfig.REGION,
  apiVersion: 'v4',
  accessKeyId: S3BucketConfig.ACCESS_KEY,
  secretAccessKey: S3BucketConfig.SECRET_KEY
});

function uploadFileToS3Bucket(
  fileToUpload: UploadedFile,
  entityType: EntityType = EntityType.GENERAL,
  entityId = ''
) {
  return s3
    .upload({
      Bucket: S3BucketConfig.PUBLIC_BUCKET_NAME,
      Key: generateBucketKey(fileToUpload.name, entityType, entityId),
      Body: fileToUpload.data,
      ACL: 'public-read',
      ContentType: fileToUpload.mimetype
    })
    .promise();
}

export default uploadFileToS3Bucket;

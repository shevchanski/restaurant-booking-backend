import { BYTE_SIZE } from './global.config';

const S3BucketConfig = {
  ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
  SECRET_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  REGION: process.env.S3_BUCKET_REGION,
  PUBLIC_BUCKET_NAME: process.env.S3_PUBLIC_BUCKET_NAME ?? ''
};

const FileUploadConfig = {
  MAX_FILE_SIZE: 15 * BYTE_SIZE * BYTE_SIZE, // 15 MB
  FILE_TYPES: [
    'image/jpeg', // .jpg, .jpeg, .jfif, .pjpeg, .pjp
    'image/png' // .png
  ]
};

export { FileUploadConfig, S3BucketConfig };

const S3BucketConfig = {
  ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
  SECRET_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  REGION: process.env.S3_BUCKET_REGION,
  PUBLIC_BUCKET_NAME: process.env.S3_PUBLIC_BUCKET_NAME ?? ''
};

const FileUploadConfig = {
  //   MIN_FILE_SIZE: 5 * 1024 * 1024 // 5 MB
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 15 MB
  FILE_TYPES: [
    'image/jpeg', // .jpg, .jpeg, .jfif, .pjpeg, .pjp
    'image/png' // .png
  ]
};

export { FileUploadConfig, S3BucketConfig };

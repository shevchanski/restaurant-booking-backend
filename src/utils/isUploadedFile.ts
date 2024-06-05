import { UploadedFile } from 'express-fileupload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUploadedFileType = (value: any): value is UploadedFile =>
  !!value.mimetype;

export default isUploadedFileType;

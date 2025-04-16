export enum ErrorType {
  FILE_SIZE = 'FILE_SIZE',
  FILE_TYPE = 'FILE_TYPE',
  MAX_IMAGES = 'MAX_IMAGES',
  SERVER_ERROR = 'SERVER_ERROR',
  COMPRESSION_ERROR = 'COMPRESSION_ERROR',
}

export interface ImageError {
  message: string;
  type: ErrorType;
  data?: any;
}

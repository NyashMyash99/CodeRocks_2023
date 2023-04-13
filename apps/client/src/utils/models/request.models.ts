export interface NestErrorModel {
  message: string;
  statusCode: number;
}

export interface ValidationErrorModel {
  error: string;
  message: string[];
  statusCode: number;
}

export interface ErrorModel {
  statusCode: number;
  message: string[];
}

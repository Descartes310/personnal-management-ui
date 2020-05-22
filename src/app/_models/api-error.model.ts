export interface APIError {
  code: string;
  status: string;
  message: string;
  errors: {
    [key: string]: Array<string>
  };
}

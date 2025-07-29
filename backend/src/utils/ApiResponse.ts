export class ApiResponse {
  data: any;
  message: string;
  status: string;
  constructor(data: any, message: string, status = 'success') {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

import { Injectable } from '@nestjs/common';

export interface UserValidationResponse {
  isValid: boolean;
  status?: string;
}

@Injectable()
export class AppService {
  validateUser(username: string, password: string): UserValidationResponse {
    if (username === 'admin' && password === 'password') {
      return { isValid: true, status: 'valid' };
    }
    return { isValid: false, status: 'invalid' };
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}

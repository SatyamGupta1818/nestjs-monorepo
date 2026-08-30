import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  async createOrderForUser(userId: string): Promise<{ message: string }> {
   const pattern = { cmd: 'validate_user' };
   const payload = { username: "admin", password: 'password', userId: userId };

   const authResponse = await firstValueFrom(this.authClient.send(pattern, payload));

   if (authResponse.isValid) {
     return { message: `Order created for user ${userId}` };
   }

   return { message: `User ${userId} is not valid` };
  }

  getData(): { message: string } {
   return { message: 'Hello API' };
  }
}

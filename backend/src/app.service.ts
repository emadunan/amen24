import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {    
    const loadedEnv = this.configService.getOrThrow<string>('NODE_ENV');
    return `Hello World! loaded environment is ${loadedEnv}`;
  }
}

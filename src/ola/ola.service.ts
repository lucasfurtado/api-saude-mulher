import { Injectable } from '@nestjs/common';

@Injectable()
export class OlaService {
  getHello(): string {
    return 'API online!';
  }
}

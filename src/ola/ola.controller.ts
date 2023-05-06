import { Controller, Get } from '@nestjs/common';
import { OlaService } from './ola.service';

@Controller('/ola')
export class OlaController {
  constructor(private readonly appService: OlaService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

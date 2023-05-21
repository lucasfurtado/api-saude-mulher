import { Controller, Get } from '@nestjs/common';
import { OlaService } from './ola.service';
import { Public } from 'src/helper/decorator.helper';

@Controller('/ola')
export class OlaController {
  constructor(private readonly appService: OlaService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../services/app.service';
import { InfoDto } from '../dtos/info.dto';

@ApiTags('instanceInfo')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get instance info' })
  @ApiResponse({
    status: 200,
    description: 'Instance info',
    type: InfoDto,
  })
  @Get()
  getInstanceInfo(): InfoDto {
    return this.appService.getHello();
  }
}

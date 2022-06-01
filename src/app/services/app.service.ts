import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfoDto } from '../dtos/info.dto';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): InfoDto {
    return {
      isMain: this.configService.get('IS_MAIN'),
      instanceId: this.configService.get('INSTANCE_ID'),
    };
  }

  static isMain(): boolean {
    return Number(process.env.IS_MAIN) === 1;
  }
}

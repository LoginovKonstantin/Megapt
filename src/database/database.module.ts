import { Module, Logger } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        repositoryMode: true,
        define: {
          underscored: true,
          timestamps: false,
        },
        logging:
          +configService.get('DB_DEBUG') === 1
            ? (message, timing) =>
                new Logger('Database').log(message, { executionTime: timing })
            : false,
        pool: {
          min: +configService.get('DB_POOL_MIN'),
          max: +configService.get('DB_POOL_MAX'),
          acquire: +configService.get('DB_POOL_ACQUIRE_TIMEOUT_MILLIS'),
          idle: +configService.get('DB_POOL_IDLE_TIMEOUT_MILLIS'),
        },
        dialectOptions: {
          decimalNumbers: true,
          maxPreparedStatements: 20,
        },
        benchmark: true,
        logQueryParameters: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

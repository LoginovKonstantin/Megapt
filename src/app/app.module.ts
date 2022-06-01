import * as basicAuth from 'express-basic-auth';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from '../database/database.module';
import { GroupsModule } from '../groups/groups.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    GroupsModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationShutdown {
  constructor(private sequelize: Sequelize) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onApplicationShutdown(signals?: string): Promise<void> {
    await this.sequelize.close();
  }
}

export function updateEnvs() {
  process.env.IS_MAIN = String(process.env.NAME === 'megapt-master' ? 1 : 0);
  process.env.INSTANCE_ID = (Math.random() + 1).toString(36).substring(7);
}

export function enableCors(app) {
  const urlsWhitelist = ['http://localhost:3000'];

  const domainsWhitelist = [];

  app.enableCors({
    origin: function (origin, callback) {
      if (
        !origin ||
        urlsWhitelist.indexOf(origin) !== -1 ||
        domainsWhitelist.indexOf(origin.split('.').slice(-2).join('.')) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
}

export function enableDocs(app) {
  const login = process.env.DOCS_LOGIN;
  const password = process.env.DOCS_PASSWORD;

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { [login]: password },
    }),
  );

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Megapt')
        .setDescription('The Megapt API description')
        .setVersion('1.0')
        .build(),
    ),
  );
}

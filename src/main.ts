import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/config';
import { SettingService } from './common/setting';
import { config } from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SettingService.config
  ConfigService.configureMiddleware(app)

  await app.listen(SettingService.PORT);
}

bootstrap();

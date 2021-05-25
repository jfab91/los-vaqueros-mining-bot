import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('app port', PORT)
  await app.listen(PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // app.enableShutdownHooks()

}
//[x]Criar Validação do field
//[x]Colocar data na criação do book

bootstrap();


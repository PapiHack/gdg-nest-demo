import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('GDG Ticket API')
    .setDescription(
      'A simple REST API built with NestJS during the GDG Dakar Meetup breakfast to manage tickets 😎',
    )
    .setContact('PapiHack', 'https://itdev.sn', 'itdev94@gmail.com')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

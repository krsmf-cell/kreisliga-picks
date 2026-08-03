import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
async function bootstrap() {
  const app =
await NestFactory.create<NestExpressApplication>(
  AppModule,
);
app.useStaticAssets(
  join(__dirname, "..", "uploads"),
  {
    prefix: "/uploads/",
  },
);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: '*',
    allowedHeaders: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

 const port = Number(process.env.PORT) || 3000;

await app.listen(port);

console.log(`Server läuft auf Port ${port}`);

  console.log("CORS AKTIV");
}

bootstrap();
async function bootstrap() {
  console.log("=== START 1 ===");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log("=== START 2 ===");

  app.useStaticAssets(
    join(__dirname, "..", "uploads"),
    {
      prefix: "/uploads/",
    },
  );

  console.log("=== START 3 ===");

  app.enableCors({
    origin: true,
    credentials: true,
    methods: "*",
    allowedHeaders: "*",
  });

  console.log("=== START 4 ===");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  console.log("=== START 5 ===");

  const port = Number(process.env.PORT) || 3000;

  console.log("=== VOR LISTEN ===");

  await app.listen(port);

  console.log("=== NACH LISTEN ===");
}

bootstrap();
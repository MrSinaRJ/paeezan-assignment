import {
  Logger,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import configuration from './config/configuration';

// We'll use configuration directly here
// Load type safe env variables
const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS config
  app.enableCors({
    origin: config.app.corsOrigin || 'http://localhost:3000',
    methods: config.app.corsMethods?.split(','),
  });

  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
    defaultVersion: VERSION_NEUTRAL,
  });

  // Add Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Set up Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Paeezan Assignment API')
    .setDescription(
      'A transformer of numbers to words using the old keypad style input.',
    )
    .setVersion('0.0.1')
    .addGlobalParameters({
      in: 'header',
      name: 'version',
      required: false,
      schema: {
        example: '1',
      },
    })
    .addServer(`https://paeezan-assignment.darkube.app`, 'Test Server')
    .addServer(`http://localhost:${config.app.port}`, 'Local Server')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Set up Helmet for security
  app.use(helmet());

  // Set up listening port
  const port = config.app.port || 3000;

  // Start the app
  await app.listen(port);

  // Log environment and port information
  Logger.log(`App name: ${config.app.name}`, 'main.ts, bootstrap');
  Logger.log(`Environment: ${config.app.env}`, 'main.ts, bootstrap');
  Logger.log(`Application is running on port ${port}`, 'main.ts, bootstrap');
}
bootstrap();

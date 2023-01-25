import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation pipe
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // api doc
  const config = new DocumentBuilder()
    .setTitle('Roadmap API')
    .setDescription('로드맵 API 문서입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // authentication
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // app listen
  await app.listen(process.env.PORT);

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

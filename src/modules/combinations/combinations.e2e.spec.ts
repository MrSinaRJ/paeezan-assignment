import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';

describe('CombinationsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [CombinationsController],
      providers: [CombinationsService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(() => app.close());

  it(`POST /combinations with empty phoneNumber: 400`, () => {
    return request(app.getHttpServer())
      .post('/combinations')
      .send({ phoneNumber: '' })
      .expect(400)
      .expect((res) =>
        expect(res.body.message).toContain('phoneNumber should not be empty'),
      );
  });

  it(`POST /combinations with wrong digits: 400`, () => {
    return request(app.getHttpServer())
      .post('/combinations')
      .send({ phoneNumber: '01234' })
      .expect(400)
      .expect((res) =>
        expect(res.body.message).toContain(
          'PhoneNumber must contain only digits from 2 to 9',
        ),
      );
  });

  it(`POST /combinations with correct digits: 201`, () => {
    return request(app.getHttpServer())
      .post('/combinations')
      .send({ phoneNumber: '23' })
      .expect(201)
      .expect((res) => expect(res.body.combinations).toHaveLength(9));
  });
});

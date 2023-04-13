import { HttpStatus } from '@nestjs/common';
import { httpClient } from '../jest.setup';
import { AuthorizationDto } from '../../src/auth/dao/authorization.dto';

import { DaniilUser } from '../fixtures/users';

describe('Auth Integration', () => {
  describe('[POST] /api/auth/sign-up', () => {
    it('should register new user', async () => {
      const dto: AuthorizationDto = {
        email: 'test@gmail.com',
        password: 'qwerty123',
      };

      const { body, headers } = await signUp(dto).expect(HttpStatus.CREATED);

      expect(body).toHaveProperty('access_token');
      expect(headers).toHaveProperty('set-cookie');

      const cookies = headers['set-cookie'];
      const refreshToken = cookies.find((cookie: string) =>
        cookie.startsWith('refresh_token='),
      );
      expect(refreshToken).toBeDefined();
    });

    it('should return error when user with this email already exists', async () => {
      const dto: AuthorizationDto = {
        email: DaniilUser.email,
        password: 'qwerty123',
      };

      const { body } = await signUp(dto).expect(HttpStatus.FORBIDDEN);

      expect(body.message).toEqual('User with such email already exists');
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: DaniilUser.email,
      };

      const { body } = await signUp(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual(['password should not be empty']);
    });
  });

  describe('[POST] /api/auth/sign-in', () => {
    it('should sign-in user by email and password', async () => {
      const dto: AuthorizationDto = {
        email: DaniilUser.email,
        password: 'qwerty123',
      };

      const { body, headers } = await signIn(dto).expect(HttpStatus.CREATED);

      expect(body).toHaveProperty('access_token');
      expect(headers).toHaveProperty('set-cookie');

      const cookies = headers['set-cookie'];
      const refreshToken = cookies.find((cookie: string) =>
        cookie.startsWith('refresh_token='),
      );
      expect(refreshToken).toBeDefined();
    });

    it('should return error when user doesnt exist', async () => {
      const dto: AuthorizationDto = {
        email: 'not.existing.user@gmail.com',
        password: 'qwerty123',
      };

      const { body } = await signIn(dto).expect(HttpStatus.NOT_FOUND);

      expect(body.message).toEqual(
        'No user with such authorization data was found',
      );
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: 'not.existing.user@gmail.com',
      };

      const { body } = await signIn(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual(['password should not be empty']);
    });
  });
});

const signUp = (body: AuthorizationDto | any) =>
  httpClient.post('/auth/sign-up').send(body);

const signIn = (body: AuthorizationDto | any) =>
  httpClient.post('/auth/sign-in').send(body);

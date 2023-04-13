import { User } from '@prisma/client';

export type UserFixture = Partial<User>;

const defaultUserData: UserFixture = {
  // qwerty123
  password: '$2b$12$OlJC/EIqYHsI1wrl1dn5aeMzVkz3zCOyFwevMreht0/c6wz7858Vi',
};

export const DaniilUser: UserFixture = {
  ...defaultUserData,
  id: 'b1a10112-a589-4fc8-8d0b-abf250838a2b',
  email: 'contact@nyashmyash99.ru',
};

export const ViktoriaUser: UserFixture = {
  ...defaultUserData,
  id: '035e3d4e-cb90-47bb-8fdf-a91502c51b0a',
  email: 'viktoria@gmail.com',
};

export const usersFixture = [DaniilUser, ViktoriaUser];

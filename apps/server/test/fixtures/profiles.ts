import { Profile } from '@prisma/client';
import { DaniilUser, ViktoriaUser } from './users';

export type ProfileFixture = Partial<Profile> & { userId: string };

export const DaniilProfile: ProfileFixture = {
  id: '4a5fcbdf-2cb7-4be2-b3f2-8b02df8f142a',
  userId: DaniilUser.id,
  firstName: 'Daniil',
  lastName: 'Koshkin',
};

export const ViktoriaProfile: ProfileFixture = {
  id: 'e161cc58-c544-4463-9a39-d4aa8bd9a4c7',
  userId: ViktoriaUser.id,
  firstName: 'Viktoria',
  lastName: 'Koshkina',
};

export const profilesFixture = [DaniilProfile, ViktoriaProfile];

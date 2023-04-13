export interface UserModel {
  id: string;
  email: string;
  phoneNumber: string | null;
  profile: ProfileModel;
}

export interface ProfileModel {
  firstName?: string;
  lastName?: string;
  description?: string;
}

export interface UpdateUserModel {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

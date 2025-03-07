
export type TUserType = 'guess' | 'admin' | 'user';

export type TUser = {
  id: string;
  role: TUserType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl?: string;
  otherData?: any;
}
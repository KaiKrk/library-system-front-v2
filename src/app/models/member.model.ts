export interface Member {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token?: string;
  admin?: boolean;
}

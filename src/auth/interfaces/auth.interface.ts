import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  sub: number;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}

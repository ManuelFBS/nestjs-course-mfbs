import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  sub: number;
  role: ROLES;
}

import { SetMetadata } from '@nestjs/common/decorators';
import { ADMIN_KEY } from '../../constants/key-decorators';
import { ROLES } from '../../constants/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);

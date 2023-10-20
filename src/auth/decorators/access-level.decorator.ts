import { SetMetadata } from '@nestjs/common/decorators';
import { ACCESS_LEVEL_KEY } from '../../constants/key-decorators';

export const AccessLevel = (level: string) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);

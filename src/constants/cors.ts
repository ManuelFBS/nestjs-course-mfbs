import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,DELETE,HEAD,OPTIONS,PATCH,POST,PUT',
  credentials: true,
};

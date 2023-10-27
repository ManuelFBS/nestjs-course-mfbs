import { Module } from '@nestjs/common';
import { HttpService } from './http/http.service';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class ProvidersModule {}

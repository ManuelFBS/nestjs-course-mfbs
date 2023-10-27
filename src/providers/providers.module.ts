import { Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpCustomService],
  exports: [HttpCustomService],
})
export class ProvidersModule {}

import { Module } from '@nestjs/common';
import { S3ServiceService } from './s3-service.service';
import { S3ServiceController } from './s3-service.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [S3ServiceController],
  providers: [S3ServiceService],
  exports: [S3ServiceService],
  imports: [ConfigModule.forRoot(),]
})
export class S3ServiceModule {}

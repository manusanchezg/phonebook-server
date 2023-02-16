import { Module } from '@nestjs/common';
import { FileReceptorService } from './file-receptor.service';
import { FileReceptorController } from './file-receptor.controller';
import { S3ServiceModule } from 'src/s3-service/s3-service.module';

@Module({
  controllers: [FileReceptorController],
  providers: [FileReceptorService],
  imports: [S3ServiceModule]
})
export class FileReceptorModule {}

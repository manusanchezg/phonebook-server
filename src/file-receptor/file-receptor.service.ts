import { Injectable } from '@nestjs/common';
import { S3ServiceService } from 'src/s3-service/s3-service.service';

@Injectable()
export class FileReceptorService {
  constructor(
    private readonly s3Service: S3ServiceService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const key = `${file.fieldname}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(
      file,
      key,
    );
    return imageUrl
  }
}

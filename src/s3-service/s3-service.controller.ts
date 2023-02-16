import { Controller } from '@nestjs/common';
import { S3ServiceService } from './s3-service.service';

@Controller('s3-service')
export class S3ServiceController {
  constructor(private readonly s3ServiceService: S3ServiceService) {}
}

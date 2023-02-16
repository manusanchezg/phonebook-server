import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ServiceService {
  private logger = new Logger(S3ServiceService.name);
  private region: string;
  private s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.region =
      this.configService.get<string>('S3_REGION') ||
      'ap-south-1';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId:
          this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey:
          this.configService.get<string>('S3_SECRET_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket =
      this.configService.get<string>('S3_BUCKET');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const response: PutObjectCommandOutput =
        await this.s3.send(new PutObjectCommand(input));
      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Image not saved to s3!');
    } catch (err) {
      this.logger.error(`Cannot save file inside s3`, err);
      throw err;
    }
  }
}

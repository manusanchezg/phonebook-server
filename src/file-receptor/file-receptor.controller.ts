import { Controller } from '@nestjs/common';
import { FileReceptorService } from './file-receptor.service';
import {
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-receptor')
export class FileReceptorController {
  constructor(
    private readonly fileReceptorService: FileReceptorService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({
        //   fileType: 'png',
        // })
        // .addFileTypeValidator({
        //   fileType: 'jpg',
        // })
        // .addFileTypeValidator({
        //   fileType: 'png',
        // })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode:
            HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileReceptorService.uploadFile(file)
  }
}

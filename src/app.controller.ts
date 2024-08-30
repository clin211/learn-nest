import * as fs from 'fs';
import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads', // 指定存储文件的地方
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1024 * 2 }), // 2GB
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;

    // 读取文件并排序
    const files = fs.readdirSync(chunkDir);
    files.sort((a, b) => {
      const aNum = parseInt(a.split('-')[1]);
      const bNum = parseInt(b.split('-')[1]);
      return aNum - bNum;
    });

    let count = 0;
    let startPos = 0;
    for (const file of files) {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          count++;

          if (count === files.length) {
            fs.rm(chunkDir, { recursive: true }, () => { });
          }
        });

      startPos += fs.statSync(filePath).size;
    }
  }
}

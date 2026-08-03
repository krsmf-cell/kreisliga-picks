import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { diskStorage } from "multer";

import { extname } from "path";

@Controller("upload")
export class UploadController {

  @Post("logo")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({

        destination: "./uploads/logos",

        filename: (_, file, callback) => {

          const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

          callback(
            null,
            uniqueName + extname(file.originalname),
          );
        },
      }),
    }),
  )
  uploadLogo(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
      path: `/uploads/logos/${file.filename}`,
    };
  }
}
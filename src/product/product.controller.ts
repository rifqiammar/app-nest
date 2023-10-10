import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';
import { errorHandling } from 'helper/errorhandling';

// Multer File Filter
const allowedFileExtension = ['jpg', 'png', 'JPG', 'PNG'];
const fileFilterOption = (req: any, file: any, cb: any) => {
  const ext = file.originalname.split('.').pop();
  if (allowedFileExtension.includes(ext)) {
    cb(null, true);
  } else {
    req.errorValidateFile = 'Hanya Boleh Image';
    cb(null, false);
  }
};

// Multer Configuration
const MulterOption = {
  storage: diskStorage({
    destination: './upload',
    filename: function (req, file, cb) {
      const configSufix = Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + configSufix + '.' + ext); // fieldname = img
    },
  }),
  fileFilter: fileFilterOption,
};

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('img', MulterOption))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: any,
    @Req() req: any,
  ) {
    try {
      // Pengecekan File / filtering file, jika file bukan Image
      if (req.errorValidateFile) {
        throw new Error(req.errorValidateFile);
      }

      if (file) {
        createProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/img/${file.filename}`;
      } else {
        createProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/img/no_img.jpg`;
      }
      // return { file: file.filename, createProductDto };
      return this.productService.create(createProductDto);
    } catch (error) {
      return errorHandling(500, error.message);
    }
  }

  // Get data Image
  @Get('img/:imgpath')
  getImage(@Param('imgpath') img: any, @Res() res: any) {
    console.log();
    res.sendFile(img, { root: './upload' });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('img', MulterOption))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    // Pengecekan Jika Photo di ganti
    // let oldImgTemp = await this.productService.findOne(+id);
    // oldImgTemp = oldImgTemp.data.image;
    let oldImg = updateProductDto.oldImage;
    oldImg = String(oldImg).split('/').pop();

    // if (!file.filename && oldImg) {
    //   updateProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/img/no_img.jpg`;
    // } else if (file.filename) {
    //   fs.unlinkSync(`./upload/${oldImg}`);
    //   updateProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/img/${file.filename}`;
    // }

    if (file) {
      updateProductDto.image = `${req.protocol}://${req.hostname}:${process.env.PORT}/product/img/${file.filename}`;

      if (oldImg !== 'no_img.jpg') {
        fs.unlinkSync(`./upload/${oldImg}`);
      }
    } else {
      if (!updateProductDto.img) {
        updateProductDto.image = `${req.protocol}://${req.get(
          'host',
        )}/product/img/no_image.jpg`;

        if (oldImg !== 'no_image.jpg') {
          fs.unlinkSync(`./upload/${oldImg}`);
        }
      }
    }

    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() filename: any) {
    let img = filename.img;
    img = String(img).split('/').pop();

    if (img != 'no_image.jpg') {
      const path = './upload/' + img;
      fs.unlinkSync(path);
    }
    return this.productService.remove(+id);
  }
}

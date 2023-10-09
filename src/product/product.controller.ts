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
    if (file) {
      createProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/${file.filename}`;
    } else {
      createProductDto.img = `${req.protocol}://${req.host}:${process.env.PORT}/product/no_img.jpg`;
    }
    // return { file: file.filename, createProductDto };
    return this.productService.create(createProductDto);
  }

  @Get(':imgpath')
  getImage(@Param('imgPath') img: any, @Res() res: any) {
    console.log();
    res.sendFile(img, { root: './upload' });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

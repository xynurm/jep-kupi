import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PostProducts200 } from './entities/post.products.200.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/constants/httpResponses/template';
import { GetProduct200 } from './entities/get.products.200.entiy';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiTags('products')
  @ApiOkResponse({ type: PostProducts200 })
  @Post()
  async createOne(
    @Request() req: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    return successResponse({
      data: await this.productsService.createOne({
        name: createProductDto.name,
        price: createProductDto.price,
      }),
      path: req.url,
    });
  }

  @ApiTags('products')
  @Get()
  @ApiOkResponse({ type: GetProduct200 })
  async findAll(@Request() req: Request) {
    return successResponse({
      data: await this.productsService.findAll(),
      status_code: 200,
      path: req.url,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

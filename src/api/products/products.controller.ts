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
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/constants/httpResponses/template';
import { GetProduct200 } from './entities/get.products.200.entiy';
import { PatchProducts200 } from './entities/patch.products.200.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOkResponse({ type: PostProducts200 })
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

  @Get()
  @ApiOkResponse({ type: GetProduct200 })
  async findAll(@Request() req: Request) {
    return successResponse({
      data: await this.productsService.findAll(),
      status_code: 200,
      path: req.url,
    });
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id from a product',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PatchProducts200 })
  async updateOne(
    @Request() req: Request,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return successResponse({
      data: await this.productsService.updateOne(id, updateProductDto),
      status_code: 200,
      path: req.url,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

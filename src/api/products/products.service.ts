import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { prismaClient } from 'src/common/utils/prisma/prismaClient';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async createOne({
    name,
    price,
  }: {
    name: string;
    price: string;
  }): Promise<any> {
    const product = await prismaClient.products.create({
      data: {
        id: `${new ObjectId()}`,
        name,
        price,
      },
    });

    return product;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

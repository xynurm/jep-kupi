import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { prismaClient } from 'src/common/utils/prisma/prismaClient';
import { UpdateProductDto } from './dto/update-product.dto';
import { promises } from 'dns';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService {
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
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return product;
  }

  async findAll(): Promise<Products[]> {
    return await prismaClient.products.findMany();
  }

  async findOne(id: string): Promise<Products> {
    return await prismaClient.products.findFirstOrThrow({
      where: { id: id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

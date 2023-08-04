import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ObjectId } from 'bson';
import { prismaClient } from 'src/common/utils/prisma/prismaClient';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return await prismaClient.products.update({
      where: { id: id },
      data: {
        ...updateProductDto,
        updated_at: new Date(),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

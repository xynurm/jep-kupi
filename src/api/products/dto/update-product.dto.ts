import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;
}

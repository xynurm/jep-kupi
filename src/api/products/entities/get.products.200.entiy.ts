import { ApiProperty } from '@nestjs/swagger';

const responseAPI = {
  status: true,
  status_code: 200,
  message: 'success',
  data: [
    {
      id: '64233505af3586475d9bdc8b',
      name: 'Sanger',
      price: '10000',
    },
    {
      id: '64233505af3586475d9bdc8c',
      name: 'Kupi',
      price: '40000',
    },
    {
      id: '64233505af3586475d9bdc8d',
      name: 'Teh',
      dial_code: '5000',
    },
  ],
  error: {
    name: null,
    message: null,
    response: null,
  },
  timestamp: '2023-03-28T23:16:33.029Z',
  path: '/countries',
};

export class GetProduct200 {
  @ApiProperty({
    type: typeof responseAPI.status,
    description:
      'true or false. True if request success (status code 2xx), false if request fail',
    example: responseAPI.status,
  })
  status: typeof responseAPI.status;

  @ApiProperty({
    type: typeof responseAPI.status_code,
    description: 'Representation of header status code',
    example: responseAPI.status_code,
  })
  status_code: typeof responseAPI.status_code;

  @ApiProperty({
    type: typeof responseAPI.message,
    description: 'Message for this request',
    example: responseAPI.message,
  })
  message: typeof responseAPI.message;

  @ApiProperty({
    type: typeof responseAPI.data,
    description: 'Data for this request',
    example: responseAPI.data,
  })
  data: typeof responseAPI.data;

  @ApiProperty({
    type: typeof responseAPI.error,
    description:
      'Error for this request. error.message is error message for this request, then error.trace is detail error for this request',
    example: responseAPI.error,
  })
  error: typeof responseAPI.error;

  @ApiProperty({
    type: typeof responseAPI.timestamp,
    description: 'Timestamp this request flight',
    example: responseAPI.timestamp,
  })
  timestamp: typeof responseAPI.timestamp;

  @ApiProperty({
    type: typeof responseAPI.path,
    description: 'Path this request sent',
    example: responseAPI.path,
  })
  path: typeof responseAPI.path;
}

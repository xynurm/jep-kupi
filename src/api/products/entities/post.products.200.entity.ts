import { ApiProperty } from '@nestjs/swagger';

const responseAPI = {
  status: true,
  status_code: 200,
  message: 'success',
  data: {
    id: '64255928c5807342dfbe844c',
    name: 'Sanger',
    price: '15000',
    created_at: '2023-03-30T09:40:56.456Z',
    updated_at: '2023-03-30T09:40:56.456Z',
  },
  error: {
    name: null,
    message: null,
    response: null,
  },
  timestamp: '2023-04-02T20:02:35.830Z',
  path: '/products',
};

export class PostProducts200 {
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

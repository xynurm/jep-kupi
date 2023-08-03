import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const {
      message: errorMessage,
      // stack: errorStackTrace,
      name: errorName,
    } = exception;

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Uncaught Error Response';

    const errorResponseSplitter = ({
      message = 'Uncaught Error Response Message',
      statusCode = 500,
    }) => {
      message = typeof message === 'string' ? message : message?.[0];
      return { msg: message, sttsCd: statusCode };
    };

    const { msg, sttsCd } = errorResponseSplitter(errorResponse as any);

    response.status(statusCode).json({
      status: false,
      status_code: statusCode,
      data: null,
      message: 'fail',
      error: {
        name: errorName,
        message: errorMessage,
        response: {
          statusCode: sttsCd,
          message: msg,
        },
        // trace: errorStackTrace,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

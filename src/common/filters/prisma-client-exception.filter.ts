//src/prisma-client-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const errorMessage = exception.message.replace(/\n/g, '');
    const { name: errorName } = exception;

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

    switch (exception.code) {
      case 'P2002': {
        const statusCode = HttpStatus.CONFLICT;
        response.status(statusCode).json({
          status: false,
          status_code: statusCode,
          message: 'fail',
          data: null,
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
        break;
      }
      case 'P2025': {
        const statusCode = HttpStatus.NOT_FOUND;
        response.status(statusCode).json({
          status: false,
          status_code: statusCode,
          message: 'fail',
          data: null,
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
        break;
      }
      case 'P2023': {
        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          status: false,
          status_code: statusCode,
          message: 'fail',
          data: null,
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
        break;
      }
      default:
        console.log('exception.code', exception.code);
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}

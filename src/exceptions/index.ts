import { HttpException, HttpStatus } from '@nestjs/common';

export class Exceptions {
  static getForbiddenException(message: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: message,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  static getBadRequestException(message: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static getConflictException(message: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.CONFLICT,
        message,
      },
      HttpStatus.CONFLICT,
    );
  }

  static getNotFoundException(message: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  static getInternalException(message: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

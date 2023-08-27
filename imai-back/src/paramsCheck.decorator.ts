import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

export const ParamsCheck = createParamDecorator(
    (paramName: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.query[paramName]) {
            throw new HttpException('Missing a required parameter: ' + paramName, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    },
);

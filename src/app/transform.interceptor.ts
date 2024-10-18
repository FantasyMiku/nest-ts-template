import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Inject, Injectable, Logger, StreamableFile } from '@nestjs/common';
import { getClientIp } from '@supercharge/request-ip';
import { map, Observable } from 'rxjs';

import { transformJson } from '@/utils';

@Injectable()
export class TransformInterceptor<T extends ResponseBody<object>>
  implements NestInterceptor<T, ResponseBody<T>>
{
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseBody<T>> {
    const request = context.switchToHttp().getRequest();
    const ip = getClientIp(request);

    // Writes request information to the log
    this.logger.log(
      `Request: ${request.originalUrl} - Method: ${request.method} - IP: ${ip}`,
    );
    this.logger.verbose(
      `Method: ${request.method}\n\tRequest original url: ${
        request.originalUrl
      }\n\tIP: ${ip ?? 'None IP'}\n\tParams: ${
        transformJson(request.params) ?? 'None Params'
      }\n\tQuery: ${transformJson(request.query) ?? 'None Query'}\n\tBody: ${
        transformJson(request.body) ?? 'None Body'
      }\n\tData: ${transformJson(request.data) ?? 'None Data'}`,
    );

    const Result: ResponseBody<object> = {
      code: 0,
      message: 'Successful',
      data: {},
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return next.handle().pipe(
      map(async (Data) => {
        // If it is a file stream, return it
        if (Data instanceof StreamableFile) return Data;

        Result.data = Data;
        return Result;
      }),
    );
  }
}

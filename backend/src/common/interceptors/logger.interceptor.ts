import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        Logger.info(
          `[${request.method}], Code: ${response.statusCode} URL: ${
            request.url
          }, Query: ${JSON.stringify(request.query)}, Body: ${JSON.stringify(
            request.body,
          )} -${delay} ms`,
        );
      }),
    );
  }
}

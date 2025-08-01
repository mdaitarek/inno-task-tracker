import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('REST');

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const now = Date.now();

    return next.handle().pipe(
      tap(
        () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response?.statusCode ?? 200;
          this.logger.log(
            `${method} ${statusCode} ${originalUrl} ${userAgent} ${ip}: ${Date.now() - now}ms`,
          );
        },
        (error) => {
          const statusCode =
            error?.response?.statusCode || error?.status || 500;
          const message =
            error?.response?.message || error?.message || 'Unexpected error';

          this.logger.error(
            `${method} ${statusCode} : ${message} ${originalUrl} ${userAgent} ${ip}: ${Date.now() - now}ms`,
            error?.stack,
          );
        },
      ),
    );
  }
}

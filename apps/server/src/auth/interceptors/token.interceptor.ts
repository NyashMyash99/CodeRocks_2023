import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { TokensService } from '../../tokens/tokens.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly tokensService: TokensService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        if (!data || !data['refresh_token']) return data;

        this.tokensService.setupTokenCookie(data.refresh_token, response);
        delete data['refresh_token'];

        return data;
      }),
    );
  }
}

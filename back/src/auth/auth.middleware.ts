import { Injectable, NestMiddleware } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _service: AuthService) {}

  use(req: any, res: any, next: () => void) {
    const token = req.headers?.authorization
    if (!token) return next()

    const data = token.split(' ')[1]
    if (!data) return next()

    const id = this._service.decodeToken(data)
    if (!id) return next()

    req.data ??= {}
    req.data.userId = id
    next()
  }
}

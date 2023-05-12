import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private readonly _service: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest()

    const token = req.headers.authorization?.split(' ')?.[1]
    if (!token) return false
    try {
      return this._service.isAdmin(token)
    } catch (error) {
      return false
    }

    return true
  }
}

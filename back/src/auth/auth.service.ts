import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthService {
  private readonly _jwtSecret: string
  private readonly _adminSecret: string

  constructor(cfg: ConfigService) {
    this._jwtSecret = cfg.getOrThrow('JWT_SECRET')
    this._adminSecret = cfg.getOrThrow('ADMIN_SECRET')
  }

  /**
   * returns decoded id
   *
   * returns null if token is invalid
   */
  decodeToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, this._jwtSecret)
      return decoded?.id ?? null
    } catch (e) {
      return null
    }
  }

  isAdmin(token: string): boolean {
    try {
      const decoded = jwt.verify(token, this._adminSecret)
      return decoded?.admin === 1
    } catch (e) {
      return false
    }
  }
}

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthService {
  private readonly _jwtSecret: string

  constructor(cfg: ConfigService) {
    this._jwtSecret = cfg.getOrThrow('JWT_SECRET')
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
}

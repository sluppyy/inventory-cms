import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(() => ({
          JWT_SECRET: 'secret'
        }))
      ],
      providers: [AuthService]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('decode token', () => {
    it('normal', () => {
      const token = jwt.sign({ id: '10' }, 'secret')
      expect(service.decodeToken(token)).toEqual('10')
    })

    it('invalid', () => {
      const token = jwt.sign({ id: '10' }, 'secret2')
      expect(service.decodeToken(token)).toEqual(null)
    })
  })
})

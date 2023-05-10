import { Test, TestingModule } from '@nestjs/testing'
import { AuthMiddleware } from './auth.middleware'
import { AuthModule } from './auth.module'
import { ConfigModule } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken')

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(() => ({
          JWT_SECRET: 'secret'
        })),
        AuthModule
      ],
      providers: [AuthMiddleware]
    }).compile()

    middleware = module.get(AuthMiddleware)
  })

  it('should be defined', () => {
    expect(middleware).toBeDefined()
  })

  it('normal', () => {
    const token = jwt.sign({ id: '10' }, 'secret')
    const req: any = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    middleware.use(req, null, () => {})

    expect(req.data.userId).toBe('10')
  })

  it('empty', () => {
    const req: any = { headers: {} }
    middleware.use(req, null, () => {})

    expect(req.data?.userId).toBe(undefined)
  })

  it('invalid', () => {
    const token = jwt.sign({ id: '10' }, 'secret2')
    const req: any = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    middleware.use(req, null, () => {})

    expect(req.data?.userId).toBe(undefined)
  })
})

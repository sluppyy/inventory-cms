import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard

  beforeEach(() => {
    guard = new AuthGuard()
  })

  it('should be defined', () => {
    expect(guard).toBeDefined()
  })

  it('normal', () => {
    const can = guard.canActivate({
      switchToHttp() {
        return {
          getRequest() {
            return {
              data: { userId: '10' }
            }
          }
        }
      }
    } as any)

    expect(can).toBe(true)
  })

  it('empty', () => {
    const can = guard.canActivate({
      switchToHttp() {
        return {
          getRequest() {
            return {}
          }
        }
      }
    } as any)

    expect(can).toBe(false)
  })
})

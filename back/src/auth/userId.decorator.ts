import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const UserId = createParamDecorator(
  (data: void, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.data.userId
  }
)

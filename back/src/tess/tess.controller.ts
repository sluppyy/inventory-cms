import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiSecurity } from '@nestjs/swagger'
import { AuthGuard } from 'auth/auth.guard'
import { UserId } from 'auth/userId.decorator'

@Controller('tess')
export class TessController {
  @ApiSecurity('')
  @Get()
  @UseGuards(new AuthGuard())
  a(@UserId() userId: string) {
    return { userId, a: 3 }
  }
}

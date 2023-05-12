import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { InventoryError } from './inventory.error'
import { Response } from 'express'

@Catch(InventoryError)
export class InventoryFilter implements ExceptionFilter {
  catch(exception: InventoryError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    res.status(400).json({
      statusCode: exception.code
    })
  }
}

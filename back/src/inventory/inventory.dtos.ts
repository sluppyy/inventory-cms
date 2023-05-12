import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Min } from 'class-validator'

export class AddItems {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  itemId: string

  @ApiProperty()
  @IsNumber()
  @Min(1)
  count: number
}

export class DeleteItems {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  itemId: string

  @ApiProperty()
  @IsNumber()
  @Min(1)
  count: number
}

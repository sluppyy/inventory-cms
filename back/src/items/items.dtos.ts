import { IsOptional, IsString } from 'class-validator'
import { Item } from './items.models'
import { ApiProperty } from '@nestjs/swagger'

export class CreateItem {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  imgUrl?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  meta?: string
}

export class UpdateItem {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  imgUrl?: string | null

  @ApiProperty()
  @IsOptional()
  @IsString()
  meta?: string | null
}

export class DeleteItem {
  @ApiProperty()
  @IsString()
  id: string
}

export type PublicItem = Omit<Item, 'deleted'>
export function publicItem({ deleted, ...item }: Item): PublicItem {
  return item
}

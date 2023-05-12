export class Item {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imgUrl?: string,
    readonly meta?: string
  ) {}
}

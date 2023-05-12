export class Item {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly deleted: boolean,
    readonly imgUrl?: string,
    readonly meta?: string
  ) {}
}

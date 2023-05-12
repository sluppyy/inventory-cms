export abstract class InventoryErrors extends Error {}

export class NonPositiveCountError extends InventoryErrors {}
export class TooBigCount extends InventoryErrors {}

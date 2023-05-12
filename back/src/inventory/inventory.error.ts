export abstract class InventoryError extends Error {
  abstract readonly code: string
}

export class NonPositiveCountError extends InventoryError {
  code = 'NonPositiveCountError'
}
export class TooBigCount extends InventoryError {
  code = 'TooBigCount'
}
export class ItemNotExistsError extends InventoryError {
  code = 'ItemNotExistsError'
}

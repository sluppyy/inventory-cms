export class UserItems {
  constructor(
    readonly userId: string,
    readonly itemId: string,
    readonly count: number
  ) {}

  copy(userItems: Partial<Omit<UserItems, 'copy'>>) {
    return new UserItems(
      userItems.userId ?? this.userId,
      userItems.itemId ?? this.itemId,
      userItems.count ?? this.count
    )
  }
}

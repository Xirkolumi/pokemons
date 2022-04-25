import { PageEvent } from "@angular/material/paginator";

export class AddToWishList {
  static readonly type = '[List] Add To Wish List';
  constructor(public readonly payload: number) { }
}
export class DeleteFromWishList {
  static readonly type = '[List] Delete Fom Wish List';
  constructor(public readonly payload: number) { }
}
export class AddToCaughtList {
  static readonly type = '[List] Add To Caught List';
  constructor(public readonly payload: number) { }
}
export class DeleteFromCaughtList {
  static readonly type = '[List] Delete Fom Caught List';
  constructor(public readonly payload: number) { }
}
export class GetItemsPageOffset {
  static readonly type = '[List] Get Items Page Offset';
  constructor(public readonly payload: PageEvent) { }
}
export class GetItemsPage {
  static readonly type = '[List] Get Items Page';
  constructor() { }
}
export class SetFilterByName {
  static readonly type = '[List] Set Filter By Name';
  constructor(public readonly payload: string) { }
}
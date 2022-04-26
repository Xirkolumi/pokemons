import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, switchMap, merge, from, mergeMap, scan } from 'rxjs';
import { PokemonListItem } from '../list.model';
import { ListHttpService } from './list-http.service';
import { AddToCaughtList, AddToWishList, DeleteFromCaughtList, DeleteFromWishList, GetItemsPage, GetItemsPageOffset, SetFilterByName } from './list.actions';

export interface ListStateModel {
  list: PokemonListItem[];
  wishList: number[];
  caughtList: number[];
  limit: number;
  offset: number;
  total: number;
  error: string;
}

@State<ListStateModel>({
  name: 'ListState',
  defaults: {
    list: [],
    wishList: [],
    caughtList: [],
    limit: 10,
    offset: 0,
    total: 0,
    error: ''
  }
})
@Injectable()
export class ListState {
  @Selector() static SelectPokemonPage(state: ListStateModel): PokemonListItem[] {
    return state.list;
  }

  @Selector() static SelectTotal(state: ListStateModel): number {
    return state.total;
  }

  @Selector() static SelectError(state: ListStateModel): string {
    return state.error;
  }

  constructor(private listHttpService: ListHttpService) {

  }

  @Action(AddToCaughtList)
  addToCaughtList(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: AddToCaughtList
  ) {
    const state = getState();
    const element = state.list.find(x => x.id === payload);
    if (element) {
      element.caught = true;

    }
    setState({
      ...state,
      caughtList: [...state.caughtList, payload]
    });
  }

  @Action(DeleteFromCaughtList)
  deleteFromCaughtList(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: DeleteFromCaughtList
  ) {
    const state = getState();
    const element = state.list.find(x => x.id === payload);
    if (element) {
      element.caught = false;
    }
    setState({
      ...state,
      caughtList: this.arrayRemove(state.caughtList, payload)
    });
  }

  @Action(AddToWishList)
  addToWishList(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: AddToWishList
  ) {
    const state = getState();
    const element = state.list.find(x => x.id === payload);
    if (element) {
      element.wishlist = true;

    }
    setState({
      ...state,
      wishList: [...state.wishList, payload]
    });
  }

  @Action(DeleteFromWishList)
  deleteFromWishList(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: DeleteFromWishList
  ) {
    const state = getState();
    const element = state.list.find(x => x.id === payload);
    if (element) {
      element.wishlist = false;
    }
    setState({
      ...state,
      wishList: this.arrayRemove(state.wishList, payload)
    });
  }

  @Action(GetItemsPageOffset)
  getItemsPageOffset(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: GetItemsPageOffset
  ) {
    const state = getState();
    setState({
      ...state,
      offset: payload.pageIndex * payload.pageSize,
      limit: payload.pageSize
    });

  }

  @Action(SetFilterByName)
  setFilterByName(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: SetFilterByName
  ) {
    let state = getState();

    this.listHttpService.getPokemon(payload)
      .subscribe({
        next: (result: PokemonListItem) => {
          result.wishlist = state.wishList.indexOf(result.id) >= 0 ? true : false;
          result.caught = state.caughtList.indexOf(result.id) >= 0 ? true : false;
          setState({
            ...state, list: [result], error: ''
          })
        },
        error: () => {
          setState({
            ...state,
            error: `Pokemon ' ${payload} ' not found!`
          })
        }
      })
  }

  @Action(GetItemsPage)
  getItemsPage(
    { getState, setState }: StateContext<ListStateModel>,
  ) {
    let state = getState();

    this.listHttpService.getPokemonPage(state.limit, state.offset)
      .pipe(
        tap(x => {
          setState({ ...state, list: [], total: x.count, error: '' });
          state = getState();
        }),
        switchMap(x =>
          merge(
            from(x.results).pipe(
              mergeMap(y => this.listHttpService.makeRequest(y.url)),
              scan((acc, value) => acc.concat(value), [])
            )
          )
        )
      )
      .subscribe((result: PokemonListItem[]) => {
        result.forEach(x => {
          x.wishlist = state.wishList.indexOf(x.id) >= 0 ? true : false;
          x.caught = state.caughtList.indexOf(x.id) >= 0 ? true : false;
        })
        setState({ ...state, list: result.sort((a: PokemonListItem, b: PokemonListItem) => a.id - b.id) })
      })
  }

  private arrayRemove(array: any, value: any) { // TODO: remove any, set typing 
    return array.filter((element: any) => {
      return element !== value;
    });
  }
}

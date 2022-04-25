import { AddToCaughtList as AddToCaughtList, AddToWishList, DeleteFromCaughtList as DeleteFromCaughtList, DeleteFromWishList, GetItemsPage, GetItemsPageOffset, SetFilterByName } from './store/list.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { PokemonListItem } from './list.model';
import { ListState } from './store/list.state';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'sprites', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<PokemonListItem>();

  @Select(ListState.SelectPokemonPage) listItems: Observable<PokemonListItem[]> | undefined;
  @Select(ListState.SelectTotal) total: Observable<number> | undefined;
  @Select(ListState.SelectError) error: Observable<string> | undefined;

  @ViewChild('nameFilter') nameFilter?: any;

  constructor(private store: Store) { }

  ngOnInit() {
    this.getPokemons();
    this.listItems?.subscribe(x => this.dataSource.data = x);
  }

  public getPokemons() {
    this.store.dispatch(new GetItemsPage());
  }

  public toggleCaught = (id: number, previousValue: boolean) => {
    !previousValue ? this.store.dispatch(new AddToCaughtList(id)) : this.store.dispatch(new DeleteFromCaughtList(id))
    previousValue = !previousValue;
  }

  public toggleWishList = (id: number, previousValue: boolean) => {
    !previousValue ? this.store.dispatch(new AddToWishList(id)) : this.store.dispatch(new DeleteFromWishList(id))
    previousValue = !previousValue;
  }

  public doFilter(event: any) {
    if (!event.target.value) {
      return;
    }
    this.store.dispatch(new SetFilterByName(event.target.value));
  }

  clearFilter() {
    if (!this.nameFilter.nativeElement.value) {
      return;
    }
    if (this.nameFilter) {
      this.nameFilter.nativeElement.value = '';
    }
    this.getPokemons();
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(new GetItemsPageOffset(event)).subscribe(() => this.getPokemons());
  }
}
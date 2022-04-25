import { PokemonListItem } from './../list/list.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ListItemHttpService } from './list-item-http.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  pokemon?: PokemonListItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listItemHttpService: ListItemHttpService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.params['id']) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute })
    }
    this.getPokemon(this.activatedRoute.snapshot.params['id'])
  }

  getPokemon(id: number): void {
    this.listItemHttpService.getPokemon(id).pipe(take(1)).subscribe(x => this.pokemon = x);
  }

}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item.component';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListItemComponent }
    ])
  ]
})
export class ListItemModule {

}

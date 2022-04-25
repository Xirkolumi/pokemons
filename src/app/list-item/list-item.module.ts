import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemHttpService } from './list-item-http.service';
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
  ],
  providers: [
    ListItemHttpService
  ]
})
export class ListItemModule {

}

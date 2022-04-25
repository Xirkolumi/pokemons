import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ListItemHttpService } from './list-item-http.service';
import { of } from 'rxjs';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  const ListItemHttpServiceMock = {
    getPokemon: () => of({})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ListItemHttpService, useValue: ListItemHttpServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

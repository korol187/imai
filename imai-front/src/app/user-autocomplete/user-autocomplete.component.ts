import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpCustomService, User } from '../http-custom.service';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';

export interface State {
  picture: string;
  fullname: string;
  followers: string;
}

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    MatSlideToggleModule,
    AsyncPipe,
    AbbreviateNumberPipe
  ],
})
export class UserAutocompleteComponent {
  stateCtrl = new FormControl('');
  filteredStates: Observable<User[]>;

  constructor(httpCustomService: HttpCustomService) {
    // httpCustomService.getUsers('шелягіна')
    //   .subscribe(res => console.log(res));
    // httpCustomService.getFeed("gusenica_lo").subscribe(res => console.log(res));
    // httpCustomService.getContacts('gusenica_lo').subscribe(res => console.log(res));

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      filter(query => (query || '').length > 2),
      switchMap(name => httpCustomService.getUsers(name as string))
    );
  }

}

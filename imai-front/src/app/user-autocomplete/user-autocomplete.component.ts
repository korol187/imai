import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgFor, AsyncPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpCustomService, User, Contact, Feed } from '../http-custom.service';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';

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
    AbbreviateNumberPipe,
    MatCardModule,
    SlicePipe,
    UpperCasePipe,
    MatButtonModule
  ],
})
export class UserAutocompleteComponent {
  stateCtrl = new FormControl('');
  users: Observable<User[]>;
  feeds!: Observable<Feed[]>;
  contacts!: Observable<Contact[]>;
  httpCustomService: HttpCustomService;

  constructor(httpCustomService: HttpCustomService) {
    this.httpCustomService = httpCustomService
    this.users = this.stateCtrl.valueChanges.pipe(
      filter(query => (query || '').length > 2),
      switchMap(name => this.httpCustomService.getUsers(name as string))
    );
  }

  getPostsAndContacts(username: string) {
    this.feeds = this.httpCustomService.getFeed(username);

    this.feeds.subscribe(res => console.log(res));
    this.contacts = this.httpCustomService.getContacts(username).pipe(
      map(contactsFull => contactsFull.contacts)
    );
    this.contacts.subscribe(res => console.log(res));

  }

}

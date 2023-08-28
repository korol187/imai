import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  followers: number;
  fullname: string;
  is_verified: boolean;
  picture: string;
  user_id: number;
  username: string;
};

@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {

  private domain = 'http://localhost:3000/';

  constructor(
    private http: HttpClient) { }

    getUsers(query: string): Observable<User[]> {
      return this.http.get<User[]>(this.domain + 'users?query=' + query);
    }
  
    getFeed(query: string) {
      return this.http.get(this.domain + 'feed?url=' + query);
    }
    
    getContacts(query: string) {
      return this.http.get(this.domain + 'contacts?url=' + query);
    }

}

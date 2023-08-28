import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  followers: number;
  fullname: string;
  is_verified: boolean;
  picture: string;
  user_id: number;
  username: string;
};

export interface ImageCandidates {
  width: number,
  height: number,
  url: string
}

export interface Feed {
  pk: number,
  display_url: string,
  image_versions2: {
    candidates: ImageCandidates[]
  },
  video_dash_manifest: string,
  video_url: string,
  taken_at: number,
  code: string,
  comment_count: number,
  like_count: number,
  play_count: number,
  like_and_view_counts_disabled: boolean,
  media_type: number,
  caption: {
    text: string
  },
  title: string,
  user: {
    pk: number,
    username: string,
    full_name: string,
    profile_pic_url: string,
    is_private: boolean,
    is_verified: boolean
  },
  coauthor_producers: null,
  product_type: string,
  can_viewer_reshare: boolean,
  is_paid_partnership: boolean,
  sponsor_tags: string,
  clips_metadata: string
}

export interface Contact {
  type: string,
  value: string,
  formatted_value: string
}
export interface ContactsFull {
  user_id: number,
  username: string,
  url: string,
  picture: string,
  fullname: string,
  contacts: Contact[]
}

@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {

  private domain = 'http://localhost:3000/';

  constructor(
    private http: HttpClient) { }

    getUsers(query: string) {
      return this.http.get<User[]>(this.domain + 'users?query=' + query);
    }
  
    getFeed(query: string) {
      return this.http.get<Feed[]>(this.domain + 'feed?url=' + query);
    }
    
    getContacts(query: string) {
      return this.http.get<ContactsFull>(this.domain + 'contacts?url=' + query);
    }

}

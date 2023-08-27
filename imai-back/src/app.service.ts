import { Injectable } from '@nestjs/common';
import { CustomHttpService } from './customHttp.service'

@Injectable()
export class AppService {

  constructor(private readonly httpService: CustomHttpService) {}

  // Retuns an autocomplete list of Instagram profiles based on your search query
  async getUsers(query: string) {
    const url = `dict/users/?limit=10&type=search&platform=instagram&q=${query}`;
    const responce = await this.httpService.get(url)
    console.log('--------------------');
    return responce.data.data;
  }

  // Retuns the latest 12 posts of an Instagram profile, along with basic stats for each post.
  async getFeed(query: string) {
    const url = `raw/ig/user/feed/?url=${query}`;
    const responce = await this.httpService.get(url)
    console.log('--------------------');

    return responce.data.items;
  }

  // Returns a list of other social media platforms and contact details(email, phone, etc...) associated with an Instagram profile.
  async getContacts(query: string) {
    const url = `exports/contacts/?platform=instagram&url=${query}`;
    const responce = await this.httpService.get(url)
    console.log('--------------------');

    return responce.data.user_profile;
  }
}

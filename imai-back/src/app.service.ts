import fs = require('fs');
import { join } from 'path';

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';

let authKey;

try {
  authKey = JSON.parse(
    fs.readFileSync(join(process.cwd(), './auth-key2.json'))
      .toString()
  ).authKey;
} catch {
  throw Error('Please, configure auth-key.json file');
}

const imaiApi = 'https://imai.co/api/';
const headers = {
  accept: 'application/json',
  authKey
};
@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  // async getUsers(query: string): Observable<AxiosResponse<any, any>> {

  // This endpoint retuns an autocomplete list of Instagram profiles based on your search query
  async getUsers(query: string) {
    console.log(query);

    const url = `${imaiApi}dict/users/?q=${query}&limit=10&type=search&platform=instagram`;
    const responce = await firstValueFrom(
      this.httpService.get<any>(url, { headers }).pipe(
        catchError((error) => {
          console.error(error.message);

          let message;
          let code;
          if (error.response.data.error === 'no_tokens_remaining') {
            message = 'Please contact your manager. Error 1234'
            code = HttpStatus.UNAUTHORIZED;
          } else {
            message = 'Something went wrong. Please try again later. Error 4321'
            code = HttpStatus.INTERNAL_SERVER_ERROR;
          }
          throw new HttpException(message, code);
        }),
      ),
    );
    return responce.data.data;

  }

  getFeed(url: string): Observable<AxiosResponse<any, any>> {
    return this.httpService.get(
      imaiApi + 'raw/ig/user/feed/?url=' + url,
      { headers }
    );
    // This endpoint retuns the latest 12 posts of an Instagram profile, along with basic stats for each post.
  }

  getContacts(url: string): Observable<AxiosResponse<any, any>> {
    return this.httpService.get(
      imaiApi + 'exports/contacts/?url=' + url + '&platform=instagram',
      { headers }
    );
    // This endpoint returns a list of other social media platforms and contact details(email, phone, etc...) associated with an Instagram profile.
  }
}

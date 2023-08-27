import fs = require('fs');
import { join } from 'path';

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, of } from 'rxjs';

let authKey;
try {
    authKey = JSON.parse(fs.readFileSync(join(process.cwd(), './auth-key.json')).toString()).authKey;
} catch {
    throw Error('Please, configure auth-key.json file');
}

const imaiApi = 'https://imai.co/api/';
const headers = {
    accept: 'application/json',
    authKey
};

@Injectable()
export class CustomHttpService {
    constructor(private readonly httpService: HttpService) { }
    async get(url: string) {
        return await firstValueFrom(
            this.httpService.get<any>(imaiApi + url, { headers }).pipe(
                catchError((error) => {
                    console.error(error.message);
                    if (error.response.data.error === 'no_tokens_remaining') {
                        throw new HttpException('Please contact your manager. Token error.', HttpStatus.UNAUTHORIZED);
                    } else {
                        throw new HttpException('Something went wrong. Please try later.', HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }),
            ),
        );
    }
}

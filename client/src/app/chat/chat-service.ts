import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreamChat} from 'stream-chat';

import Credentials from '../../../credentials.json';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {Ride} from "../rides/ride";
import {User} from "../users/user";

@Injectable()
export class ChatService {
  readonly baseUrl: string = environment.API_URL + 'chat';
  private API_KEY = (<any>Credentials).API_KEY;
  private API_KEY_SECRET = (<any>Credentials).API_KEY_SECRET;
  private chatClient = new StreamChat(this.API_KEY, this.API_KEY_SECRET);


  constructor(private http: HttpClient) {
    this.setUser();
  }

   async setUser() {
    // this.chatClient.user("jlahey").create({
    //   name: "Jim Lahey",
    //   image: "https://i.imgur.com/fR9Jz14.png"
    // });
     let jimLahey = { '_id': 'jlahey' };

     const token = this.getToken(jimLahey);
     console.log(token.valueOf());
     await this.chatClient.setUser(
       {
         id: 'jlahey',
         name: 'Jim Lahey',
         image: 'https://i.imgur.com/fR9Jz14.png',
       },
       this.chatClient.devToken('jlahey')
     );
  }

  getToken(user: Object): Observable<string> {
    return this.http.get<string>(this.baseUrl + "/authenticate", user);
  }

  async createRideChannel(ride: Ride) {
    const channel = this.chatClient.channel('messaging', 'ride_id_here', {
      name: 'Chat for ride going from ' + 'ride.origin' + ' to ' + 'ride.destination',
    });

    let state = await channel.watch();

    const text = 'First test message is this. - Yoda';
    const response = await channel.sendMessage({
      text,
    });

    console.log(response);
  }
}

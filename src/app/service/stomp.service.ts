import { Injectable } from '@angular/core';

import * as SockJS from "sockjs-client";
import { environment } from 'src/environments/environment';
import * as Stomp from "stompjs";

@Injectable({
  providedIn: 'root'
})
export class StompService {

  private apiUrl = environment.apiUrl;
  private socket = new SockJS(`${this.apiUrl}/websocket`);
  private stompClient = Stomp.over(this.socket);

  constructor() { }

  subscribe(topic: string, fn: (message: any) => void, subscriptionId: string): void {
    const connected = this.stompClient.connected;

    if (connected) {
      this.subscribeToTopic(topic, fn, subscriptionId);
      return;
    }

    this.stompClient.connect({}, () => {
      this.subscribeToTopic(topic, fn, subscriptionId);
    });
  }

  private subscribeToTopic(topic: string, fn: (message: any) => void, subscriptionId: string): void {
    this.stompClient.subscribe(topic, (message) => fn(message), { id: subscriptionId });
  }

  public unsubscribe(subscriptionId: string): void {
    this.stompClient.unsubscribe(subscriptionId);
  }

}

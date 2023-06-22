import { Injectable } from '@angular/core';

import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable({
  providedIn: 'root'
})
export class StompService {

  private socket = new SockJS('http://localhost:8080/websocket');
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

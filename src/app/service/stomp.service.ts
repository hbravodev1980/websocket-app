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

  subscribe(topic: string, fn: (message: any) => void): void {
    const connected = this.stompClient.connected;

    if (connected) {
      this.subscribeToTopic(topic, fn);
      return;
    }

    this.stompClient.connect({}, () => {
      this.subscribeToTopic(topic, fn);
    });
  }

  private subscribeToTopic(topic: string, fn: (message: any) => void): void {
    this.stompClient.subscribe(topic, (message) => {
      fn(message);
    });
  }

  public unsubscribe(topic: string): void {
    this.stompClient.unsubscribe(topic);
  }

}

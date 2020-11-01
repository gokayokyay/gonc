import { IEventObj } from '../interfaces/Event';
import { IListener } from '../interfaces/Listener';

export default class EventStore {
  listeners: Record<string, IListener[]> = {};
  history?: IEventObj[] = [];

  constructor(disableHistory: boolean);
  constructor(disableHistory = false) {
    if (disableHistory) delete this.history;
  }

  private addHistory(eventObj: IEventObj) {
    this.history?.push(eventObj);
  }

  post(event: string): boolean;
  post(event: string, data: any): boolean;
  post(event: string, data?: any): boolean {
    this.addHistory({ event, data });
    const fns = this.listeners[event];
    if (!fns) return false;
    fns.forEach(fn => (data ? fn(data) : fn()));
    return true;
  }

  addObserver(event: string, listener: IListener): this {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(listener);
    return this;
  }

  removeObserver(event: string, fn: Function): this {
    const listeners = this.listeners[event];
    this.listeners[event] = listeners.filter(func => fn !== func);
    return this;
  }
}

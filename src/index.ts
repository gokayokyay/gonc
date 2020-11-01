import { IEventObj } from './interfaces/Event';
import { IListener } from './interfaces/Listener';
import EventStore from './models/EventStore';

const store = new EventStore(true);

export { EventStore, IEventObj, IListener };
export default store;

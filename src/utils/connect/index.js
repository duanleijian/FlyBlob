import mitt from 'mitt';
import { EmitterEvent } from './enum';

const emitter = mitt();

const eventList = [];

export const on = (eventName, callback) => {
	if (!eventList.includes(eventName)) {
		emitter.on(eventName, callback);
		eventList.push(eventName);
	}
};

export const emit = (eventName, data) => {
	emitter.emit(eventName, data);
};

export const off = (eventName) => {
	emitter.off(eventName);
};

export const clear = () => {
	eventList.forEach((name) => {
		emitter.off(name);
	});
};

export const EventNames = { ...EmitterEvent };

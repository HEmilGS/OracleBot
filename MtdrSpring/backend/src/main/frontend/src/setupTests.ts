import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

class BroadcastChannel {
    // constructor(name: string) {}
    // postMessage(message: any) {}s
    close() {}
    onmessage = null;
}

(global as any).BroadcastChannel = BroadcastChannel;
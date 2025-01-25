import { Buffer } from 'buffer'; // Use `buffer` package for browser-friendly polyfill

(window as any).Buffer = (window as any).Buffer || Buffer;

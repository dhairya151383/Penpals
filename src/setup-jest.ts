import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
import '@testing-library/jest-dom';
import 'jest-extended';

// Mock the global Worker object.
// This is essential for preventing Jest from encountering 'import.meta.url'
// errors when processing files that instantiate Web Workers.
// Jest typically runs in a Node.js (CommonJS) environment, where 'import.meta.url'
// (an ES Module feature) is not natively supported for Worker constructors.
Object.defineProperty(global, 'Worker', {
  value: class MockWorker {
    // The constructor is mocked to prevent the actual Worker creation logic
    // from running in the test environment.
    constructor(scriptURL: string | URL, options?: WorkerOptions) {
      // You can log or spy on these calls if you need to assert that
      // a worker was created with specific parameters.
      // For basic error prevention, an empty constructor is sufficient.
      // console.log(`MockWorker created with URL: ${scriptURL}`);
    }

    // Implement any methods your application code calls on the worker instance.
    // For a comment counter, `postMessage` and `onmessage` are commonly used.
    postMessage = jest.fn(); // Mock `postMessage` as a Jest spy
    onmessage = null; // Property that can be set by the application to receive messages
    terminate = jest.fn(); // Mock `terminate` if your app calls it
    addEventListener = jest.fn(); // Mock event listeners if used
    removeEventListener = jest.fn();
    dispatchEvent = jest.fn();
  },
  writable: true, // Allows the property to be reassigned
  configurable: true // Allows the property to be redefined
});

// Mock `URL.createObjectURL` and `URL.revokeObjectURL`.
// These are often used with Web Workers, especially when the worker script
// is created dynamically from a Blob or if you're using more complex worker setups.
Object.defineProperty(global.URL, 'createObjectURL', {
  value: jest.fn(() => 'blob:mock-url'), // Returns a dummy URL string
  writable: true,
  configurable: true
});

Object.defineProperty(global.URL, 'revokeObjectURL', {
  value: jest.fn(), // No-op for revoking mock URLs
  writable: true,
  configurable: true
});


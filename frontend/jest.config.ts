import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
    "testEnvironment": "jsdom"

};
export default config;
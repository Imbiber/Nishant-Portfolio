import UAParser from 'ua-parser-js';
import { BrowserDetails } from '../types';

export function parseUserAgent(userAgent: string): BrowserDetails {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    userAgent,
    browser: {
      name: result.browser.name,
      version: result.browser.version,
    },
    os: {
      name: result.os.name,
      version: result.os.version,
    },
    deviceType: result.device.type || 'desktop',
  };
}

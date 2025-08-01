'use client';

import { useEffect } from "react";

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(function (OneSignal: any) {
        OneSignal.init({
          appId: '6631c98b-2bd8-4ffa-87b8-19446254c665',
          notifyButton: {
            enable: true,
          },
        });
      });
    }
  }, []);

  return null; // Nothing to render
}

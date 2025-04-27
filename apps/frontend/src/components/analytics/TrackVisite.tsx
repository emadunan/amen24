'use client';

import { apiPublicUrl } from '@/constants';
import { useEffect } from 'react';

export default function TrackVisit() {
  useEffect(() => {
    fetch(`${apiPublicUrl}/dashboard/increment-visit`, { method: 'POST' }).catch(() => { });
  }, []);

  return null;
}

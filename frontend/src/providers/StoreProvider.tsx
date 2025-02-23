'use client';

import { FC, useRef } from 'react';
import { Provider } from 'react-redux';
import { MakeStore, AppStore } from '../store';

interface Props {
  children: React.ReactNode;
}

const StoreProvider: FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = MakeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
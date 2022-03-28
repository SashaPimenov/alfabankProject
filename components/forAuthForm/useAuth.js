import React, {useContext} from 'react';
import {AuthContext} from './authContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

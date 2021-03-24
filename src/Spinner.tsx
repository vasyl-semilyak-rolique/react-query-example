import React from 'react';

import spinner from './spinner.svg';

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <img src={spinner} alt="loading" className="w-10 h-auto" />
  </div>
);

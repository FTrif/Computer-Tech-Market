import React from 'react';
import classes from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC<{}> = () => {
  return <div className={classes.loader} />;
};

export default LoadingSpinner;

import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.appBody}>
      <MainNavigator />
    </div>
  );
}

export default App;

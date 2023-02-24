import React from 'react';
import 'react-step-progress-bar/styles.css';
import './style.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
interface IProps {
  steper?: 0 | 50 | 100;
}
const styleOn = {
  width: '21px',
  height: '21px',
  borderRadius: '50%',
  background: '#45DC42',
};
const styleOff = {
  background: '#D9D9D9',
};

const StepProgressBar: React.FC<IProps> = ({ steper = 0 }) => {
  return (
    <ProgressBar
      percent={steper}
      filledBackground="linear-gradient(to right, #45DC42, #45DC42)"
    >
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={accomplished ? styleOn : styleOff}></div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={accomplished ? styleOn : styleOff}></div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={accomplished ? styleOn : styleOff}></div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default StepProgressBar;

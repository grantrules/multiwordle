/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';

function Button({ txt, onClick, className }) {
  return (<button onClick={onClick} className={className}>{txt}</button>);
}

function NextBtn({ onClick, className }) {
  return (<Button onClick={onClick} className={className} txt="Next" />);
}

function BackBtn({ onClick, className }) {
  return (<Button onClick={onClick} className={className} txt="Back" />);
}

export { Button, NextBtn, BackBtn };

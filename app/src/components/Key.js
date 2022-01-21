import React from 'react';

export default function Key({ value, /* status, */ onClick }) {
  return (<button type="button" onClick={onClick}>{value}</button>);
}

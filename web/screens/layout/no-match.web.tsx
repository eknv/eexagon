import React, { Component } from 'react';
import XText from 'X/XText';

interface Props {
  location: Location;
}

interface Location {
  pathname: string;
}

function NoMatch(props: Props) {
  return (
    <XText style={{fontSize: '16px'}}>
     No match for <code>{props.location.pathname}</code>
    </XText>
  );
}

export default NoMatch;

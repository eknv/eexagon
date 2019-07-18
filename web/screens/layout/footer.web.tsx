import React, { Component } from 'react';
import XText from 'X/XText';
import XGroup from "X/XGroup";

const style: any = {
  backgroundColor: '#F8F8F8',
  borderTop: '1px solid #E7E7E7',
  // textAlign and position are not recognized
  textAlign: 'center',
  padding: '20px',
  position: 'fixed',
  left: '0',
  bottom: '0',
  height: '60px',
  width: '100%',
};

const phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
};

const FooterWrapper: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <XGroup>
      <XText style={phantom} />
      <XText style={style}>{children}</XText>
    </XGroup>
  );
};

const Footer: React.StatelessComponent<{}> = () => {
  return (
    <FooterWrapper>
      <XText>This is my footer</XText>
    </FooterWrapper>
  );
};

export default Footer;

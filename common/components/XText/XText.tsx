import React, { Component } from 'react';
import { IProps, IState } from './';
import { Extract, IExtract } from 'X/utils-c';
import { compose } from 'recompose';
import {Text} from "react-native";

class XText extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() { }

  render() {

    const { style, className, onPress, children, ...props } = this.props;

    return (
      <Text
        style={style}
        className={className}
        onPress={onPress}
      >
        {children}
      </Text>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XText);

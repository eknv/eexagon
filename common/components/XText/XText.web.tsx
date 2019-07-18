import React, { Component } from 'react';
import { Extract, IExtract } from 'X/utils-c';
import { compose } from 'recompose';
import { IProps, IState } from './';

class XText extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() { }

  render() {

    const { style, className, onPress, children, ...props } = this.props;

    return (
      <div
        style={style}
        className={className}
        onClick={onPress}
      >
        {children}
      </div>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XText);

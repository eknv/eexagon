import React, {Component} from 'react';
import {IProps, IState} from './';
import XText from "X/XText";
import {isNull} from "Common/utils";

class XBR extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {count} = this.props;
    const _count = isNull(count) ? 1 : count;

    let _brs = [];
    for (let index = 0; index < _count; index++) {
      _brs.push("\n");
    }

    return (
      <XText>
        {_brs}
      </XText>
    );
  }
}

export default XBR;

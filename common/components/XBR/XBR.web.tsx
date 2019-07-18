import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import {isNull} from "../../utils";

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
      _brs.push(<br key={index}/>);
    }

    return (
      <Fragment>
        {_brs}
      </Fragment>
    );
  }
}

export default XBR;

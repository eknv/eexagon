import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import {isTrue} from 'Common/utils';


class XGroup extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {onPress, style, className, centered, children} = this.props;

    const _centered = isTrue(centered);

    function Content() {
      return (
        <div
          className={className}
          style={style}
          onClick={onPress}
        >
          {children}
        </div>
      )
    }

    return (
      <Fragment>

        {!_centered &&
        <Content/>
        }

        {_centered &&
        <div style={{width: "50%", margin: "auto"}}>
          <div style={{display: "inline-block"}}>
            <Content/>
          </div>
        </div>
        }

      </Fragment>
    );
  }
}

export default XGroup;

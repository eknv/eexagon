import React, {Component} from 'react';
import {IProps, IState} from './';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';
import Collapsible from "react-native-collapsible";
import XGroup from "X/XGroup";
import {isNull} from "Common/utils";


class XCollapse extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
    this.state = {
      children: []
    };
  }

  componentDidMount() {
    const _children = React.Children.toArray(this.props.children);
    this.setState({
      children: _children
    });

    if (isNull(_children) || _children.length != 2) {
      throw new Error("#E Exactly two children elements should be passed to the XCollapse component!")
    }
  }

  render() {

    const {isOpen, style, cStyle, className, cClassName, ...props} = this.props;
    const {children} = this.state;

    return (
      <XGroup
        className={className}
        style={style}
      >
        {children[0]}
        <Collapsible
          className={cClassName}
          style={cStyle}
          collapsed={!isOpen}
        >
          {children[1]}
        </Collapsible>
      </XGroup>

    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XCollapse);

import React, {Component} from 'react';
import {IProps, IState} from './';
import {Input} from 'antd';


class XTextInput extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {

  }


  render() {

    const {placeholder, value, onChange} = this.props;

    return (
      <Input
        placeholder={placeholder}
        onPressEnter={onChange}
        onBlur={onChange}
        defaultValue={value}
      />
    );
  }


}

export default XTextInput;

import React, {Component} from 'react';
import {IProps, IState} from './';
import {Checkbox} from 'antd';
import {isNull} from "Common/utils";


class XCheckbox extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  onChange = (): void => {
    console.log("checkbox is clicked!!");
    console.log(this.props.onChange);
    this.props.onChange();
  }

  render() {

    const {checked, onChange, style} = this.props;

    return (
      <Checkbox
        style={style}
        onChange={this.onChange}
        {...(!isNull(checked) && {checked: checked})}
      ></Checkbox>
    );
  }
}

export default XCheckbox;

import React, {Component} from 'react';
import {View, CheckBox} from 'react-native';
import {IProps, IState} from './';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';


class XCheckbox extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {checked, onChange, style} = this.props;

    return (
      <CheckBox
        style={style}
        onValueChange={onChange}
        value={checked}
      />
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XCheckbox);

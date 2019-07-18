import React, {Component} from 'react';
import {Input, Item} from 'native-base';
import {IProps, IState} from './';

class XTextInput extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {placeholder, onChange, value} = this.props;

    return (
      <Item>
        <Input
          placeholder={placeholder}
          onChangeText={onChange}
          value={value || ''}
        />
      </Item>
    );
  }


}

export default XTextInput;

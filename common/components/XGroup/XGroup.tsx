import React, {Component} from 'react';
import {IProps, IState} from './';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';
import {ScrollView} from 'react-native';
import {isTrue} from 'Common/utils';

class XGroup extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {onPress, style, className, centered, children} = this.props;

    const _style = Object.assign({
      flexDirection: 'column',
      alignItems: isTrue(centered) ? 'center' : 'flex-start',
    }, style);

    return (
      <ScrollView
        className={className}
        contentContainerStyle={_style}
        onPress={onPress}
      >
        {children}
      </ScrollView>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XGroup);

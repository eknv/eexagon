import React, {Component} from 'react';
import {Button, Icon} from 'native-base';
import {images} from 'Common/assets';
import {
  Image, ActivityIndicator
} from 'react-native';
import {IProps, IState} from './';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';
import XText from 'X/XText';
import {isTrue} from 'Common/utils';


class XButton extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {$extract, $attributes, style, iconName, imageName, imageStyle, onPress, children, content, isLoading, ...props} = this.props;

    return (
      <Button
        style={style}
        onPress={onPress}
        {...$extract('theme')}
        {...$extract('size')}
        {...$extract('iconAlignment')}
        {...$attributes(props, ["theme", "size", "iconAlignment"])}
      >
        {
          iconName &&
          <Icon name={iconName}/>
        }
        {
          imageName &&
          <Image
            style={imageStyle}
            source={images[imageName]}
          />
        }

        {isTrue(isLoading) &&
        <ActivityIndicator color="white" style={{marginLeft: 8}}/>
        }

        <XText style={style}>{content}</XText>

      </Button>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XButton);

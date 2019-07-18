import React, {Component} from 'react';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';
import {IconPlacement, IProps, IState} from './';
import {Badge} from 'native-base';
import XImage from "X/XImage";
import {isNull, isNullEmpty} from "Common/utils";
import XText from "X/XText";

class XBadge extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {
      $extract, $attributeValue,
      icon, iconPlacement,
      content
    } = this.props;


    const _style = Object.assign({
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }, $attributeValue('style'));
    const _contentStyle = Object.assign({
      flex: 0
    }, $attributeValue('contentStyle'));
    const _iconStyle = Object.assign({
      flex: 0
    }, $attributeValue('iconStyle'));

    const _iconPlacement = isNull(iconPlacement) ? IconPlacement.left : iconPlacement;

    return (
      <Badge
        style={_style}
        {...$extract('theme')}
      >
        {!isNull(icon) && _iconPlacement === IconPlacement.left &&
        <XImage style={_iconStyle} icon={icon}/>
        }

        {!isNullEmpty(content) &&
        <XText style={_contentStyle}> {content}</XText>
        }

        {!isNull(icon) && _iconPlacement === IconPlacement.right &&
        <XImage style={_iconStyle} icon={icon}/>
        }
      </Badge>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XBadge);


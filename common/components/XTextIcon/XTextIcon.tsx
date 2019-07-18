import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import XGroup from "X/XGroup";
import XText from "X/XText";
import {isNull, isNullEmpty, isNullEmptyObject} from 'Common/utils'
import XImage from "X/XImage";

class XTextIcon extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {styleIcon, styleText, styleGroup, icon, text} = this.props;

    /**
     * set the default values
     */
    const _styleGroup = Object.assign({
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    }, styleGroup);
    const _styleText = Object.assign({}, styleText);
    const _styleIcon = Object.assign({}, styleIcon);
    if (!isNull(_styleIcon.size)) {
      _styleIcon.width = _styleIcon.size;
      _styleIcon.height = _styleIcon.size;
      delete _styleIcon.size;
    } else {
      _styleIcon.width = "15";
      _styleIcon.height = "15";
    }

    let _image = null;
    if (!isNullEmptyObject(icon)) {
      _image = <XImage
        style={_styleIcon}
        icon={icon}
      />
    }

    return (
      <Fragment>

        {!isNullEmptyObject(icon) && isNullEmpty(text) &&
        {_image}
        }

        {!isNullEmpty(text) && isNullEmptyObject(icon) &&
        <XText style={_styleText}>{text}</XText>
        }

        {!isNullEmpty(text) && !isNullEmptyObject(icon) &&
        <XGroup style={_styleGroup}>
          {_image}
          <XText style={_styleText}>{text}</XText>
        </XGroup>
        }

      </Fragment>

    )

  }
}

export default XTextIcon;

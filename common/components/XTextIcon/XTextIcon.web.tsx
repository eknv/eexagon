import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import XGroup from "X/XGroup";
import XText from "X/XText";
import {isNullEmptyObject, isNullEmpty, isNull} from 'Common/utils';
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
    const _styleText = Object.assign({display: "inline-block", verticalAlign: "middle"}, styleText);
    const _styleGroup = Object.assign({display: "table"}, styleGroup);
    const _styleIcon = Object.assign({display: "inline-block", verticalAlign: "middle"}, styleIcon);
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

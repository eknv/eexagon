import React, {Component, Fragment} from 'react';
import {IProps, IState, IconSegment, iconFill, iconStroke} from './';
import {stringify, isNull, isNullEmptyObject, isNullEmpty, isArrayNullEmpty} from 'Common/utils';
import {images, svgs} from 'Common/assets';
import SvgComponents from './SvgComponents';


/**
 * TODO
 * postfix all possible sizes with px so that the behavior matches that of react-native
 */

class XImage extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {style, icon} = this.props;

    /**
     * set the default values
     */
    const _style = !isNull(style) ? style : {};
    const _icon_data = !isNullEmptyObject(icon) && !isArrayNullEmpty(icon.data) ? icon.data : [""]; // todo, add an error icon in case no icon path is available
    const _color = !isNullEmptyObject(style) && !isNullEmpty(style.color) ? style.color : "#000";

    /**
     * setting default width / height values
     */
    if (!isNullEmpty(icon.imgName)) {
      if (isNull(_style.width)) {
        _style.width = "auto";
      } else {
        _style.width = _style.width;
      }
      if (isNull(_style.height)) {
        _style.height = "auto";
      } else {
        _style.height = _style.height;
      }
    } else {

      if (isNull(_style.width)) {
        _style.width = _style.height;
      }
      if (isNull(_style.height)) {
        _style.height = _style.width;
      }
      if (isNull(_style.height)) {
        _style.width = 20;
        _style.height = 20;
        console.warn(`XImage: no width/height values are provided, taking ${_style.width} as default!`)
      }
    }


    /**
     * components
     */
    let _image = null;
    if (!isNullEmpty(icon.cmpName)) {
      const ImageComponent = SvgComponents[icon.cmpName];
      // console.log(`style: ${stringify(style,',')}`);
      _image = <ImageComponent
        style={_style}
        color={_color}
        width={_style.width}
        height={_style.height}
      />;
    }

    /**
     * Images & SVGs
     */
    else if (!isNullEmpty(icon.imgName) || !isNullEmpty(icon.svgName)) {
      const _fileName = !isNullEmpty(icon.imgName) ? icon.imgName : icon.svgName;
      const _src = !isNullEmpty(icon.imgName) ? images[_fileName] : svgs[_fileName];
      _image = <img
        src={_src}
        style={_style}
        width={_style.width}
        height={_style.height}
        alt={_fileName}
      />;
    }

    /**
     * Path definitions
     */
    else {
      _image = <svg
        style={_style}
        viewBox={icon.viewBox}
        width={`${_style.width}px`}
        height={`${_style.height}px`}
        transform={icon.transform}
        fill={iconFill(icon.fill, true, _color)}
        stroke={iconStroke(icon.stroke, _color)}
        strokeLinecap={icon.strokeLinecap}
        strokeLinejoin={icon.strokeLinejoin}
        strokeWidth={icon.strokeWidth}
      >
        {(_icon_data as IconSegment[]).map(function (data_entry: IconSegment, index: number) {
          return <Fragment key={index}>
            {!isNullEmpty(data_entry.path) && <path
              transform={data_entry.transform}
              fill={iconFill(data_entry.fill, false, _color)}
              d={data_entry.path}
            ></path>
            }
            {!isNullEmpty(data_entry.circle) && <circle
              transform={data_entry.transform}
              fill={iconFill(data_entry.fill, false, _color)}
              cx={data_entry.cx}
              cy={data_entry.cy}
              r={data_entry.circle}
            ></circle>
            }
          </Fragment>
        })}
      </svg>;
    }

    return (
      <Fragment>
        {_image}
      </Fragment>
    )

  }

}


export default XImage;

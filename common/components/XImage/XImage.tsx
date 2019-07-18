import React, {Component, Fragment} from 'react';
import {IProps, IState, iconFill, iconStroke, IconSegment} from './';
import {isArrayNullEmpty, isNull, isNullEmpty, isNullEmptyObject} from 'Common/utils'
import Svg, {Path, Circle} from 'react-native-svg';
import {images, svgs} from "Common/assets";
import SvgComponents from './SvgComponents';
import {Image} from "react-native";
import XText from 'X/XText';

// TODO: the Svg library still needs to be configured for the ios platform:
// TODO: https://github.com/react-native-community/react-native-svg#ios
// TODO: https://github.com/oblador/react-native-vector-icons#ios
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
     * todo.. add a proper not found image at the end instead of this
     */
    let _image = <XText>missing</XText>;


    /**
     * setting default width / height values
     */
    if (!isNullEmpty(icon.imgName)) {
      /** set the default width and height values */
      const {width, height} = Image.resolveAssetSource(images[icon.imgName]);
      if (isNull(_style.width)) {
        _style.width = width;
      }
      if (isNull(_style.height)) {
        _style.height = height;
      }
      if (isNull(_style.height)) {
        _style.width = 20;
        _style.height = 20;
        console.warn(`XImage: no width/height values are provided, taking ${_style.width} as default!`)
      }
    } else {
      if (isNull(_style.width)) {
        _style.width = _style.height;
      }
      if (isNull(_style.height)) {
        _style.height = _style.width;
      }
      if (isNull(_style.height)) {
        _style.width = 30;
        _style.height = 30;
        console.warn(`XImage: no width/height values are provided, taking ${_style.width} as default!`)
      }
    }


    /**
     * SVG components
     */
    if (!isNullEmpty(icon.cmpName)) {
      const SvgComponent = SvgComponents[icon.cmpName];
      _image = <SvgComponent
        style={_style}
        color={_color}
        width={_style.width}
        height={_style.height}
      />;
    }

    /**
     * SVG files
     */
    else if (!isNullEmpty(icon.svgName)) {
      if (!isNull(_style.color)) {
        _style.overlayColor = _style.color;
        delete _style.color;
      }
      const SvgFile = svgs[icon.svgName].default;
      _image = <SvgFile
        style={_style}
        width={_style.width}
        height={_style.height}
        alt={icon.svgName}
      />
    }

    /**
     * image files
     */
    else if (!isNullEmpty(icon.imgName)) {
      if (!isNull(_style.color)) {
        _style.overlayColor = _style.color;
        delete _style.color;
      }
      _image = <Image
        source={images[icon.imgName]}
        style={_style}
        width={_style.width}
        height={_style.height}
        alt={icon.imgName}
      />;
    }

    /**
     * Path definitions
     */
    else {
      _image = <Svg
        style={_style}
        viewBox={icon.viewBox}
        width={_style.width}
        height={_style.height}
        transform={icon.transform}
        fill={iconFill(icon.fill, true, _color)}
        stroke={iconStroke(icon.stroke, _color)}
        strokeLinecap={icon.strokeLinecap}
        strokeLinejoin={icon.strokeLinejoin}
        strokeWidth={icon.strokeWidth}
      >
        {(_icon_data as IconSegment[]).map(function (data_entry: IconSegment, index: number) {
          return <Fragment key={index}>
            {!isNullEmpty(data_entry.path) && <Path
              transform={data_entry.transform}
              fill={iconFill(data_entry.fill, false, _color)}
              d={data_entry.path}
            ></Path>
            }
            {!isNullEmpty(data_entry.circle) && <Circle
              transform={data_entry.transform}
              fill={iconFill(data_entry.fill, false, _color)}
              cx={data_entry.cx}
              cy={data_entry.cy}
              r={data_entry.circle}
            ></Circle>
            }
          </Fragment>
        })}
      </Svg>;
    }

    return (
      <Fragment>
        {_image}
      </Fragment>
    )

  }

}

export default XImage;

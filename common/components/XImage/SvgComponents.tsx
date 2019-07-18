import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {SvgComponent} from './';

/**
 * Use the following commands for creating a react component out of a svg file:
 * npx @svgr/cli --icon AddCard.svg
 * or
 * npx @svgr/cli --icon --replace-attr-values "#063855=currentColor" icon.svg
 */

/**
 * TODO: for further icons check the following resources:
 * https://speckyboy.com/top-50-free-icon-sets/
 */

const SvgComponents: any = {};

const AddCard = ({style, className, width, height, color}: SvgComponent) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" style={style} className={className}>
    <Defs>
      <Rect id="AddCard_svg__a" x={0} y={0} width={18} height={20} rx={3}/>
      <Mask
        id="AddCard_svg__b"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={18}
        height={20}
        fill={color}
      >
        <Use xlinkHref="#AddCard_svg__a"/>
      </Mask>
    </Defs>
    <G transform="translate(1)" fill="none" fillRule="evenodd">
      <Use
        stroke={color}
        mask="url(#AddCard_svg__b)"
        strokeWidth={2}
        strokeLinecap="square"
        xlinkHref="#AddCard_svg__a"
      />
      <Path
        d="M3.5 6.5h6M6.5 3.5v6M3.5 13.5h6M3.5 15.5h8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
SvgComponents["AddCard"] = AddCard;


const BabyBottle = ({style, className, width, height, color}: SvgComponent) => (
  <Svg width={width} height={height} viewBox="0 0 20 20"  style={style} className={className}>
    <Defs>
      <Path
        d="M14.908 10.899l-6.293 7.772a3.003 3.003 0 0 1-4.22.443l-3.107-2.517a3 3 0 0 1-.445-4.219l6.294-7.772 7.771 6.293z"
        id="Baby_Bottle_svg__a"
      />
      <Mask
        id="Baby_Bottle_svg__c"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={14.734}
        height={15.176}
        fill="#fff"
      >
        <Use xlinkHref="#Baby_Bottle_svg__a"/>
      </Mask>
      <Rect id="Baby_Bottle_svg__b" x={5.652} y={4.975} width={12} height={4} rx={1}/>
      <Mask
        id="Baby_Bottle_svg__d"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={12}
        height={4}
        fill="#fff"
      >
        <Use xlinkHref="#Baby_Bottle_svg__b"/>
      </Mask>
    </Defs>
    <G transform="translate(1)" stroke="#36434D" fill="none" fillRule="evenodd">
      <Use
        mask="url(#Baby_Bottle_svg__c)"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="square"
        xlinkHref="#Baby_Bottle_svg__a"
      />
      <Use
        mask="url(#Baby_Bottle_svg__d)"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="square"
        transform="rotate(39 11.652 6.975)"
        xlinkHref="#Baby_Bottle_svg__b"
      />
      <Path
        d="M9.74 2.981a4.001 4.001 0 0 1 4.206-1.33 1.6 1.6 0 1 1 2.437 1.974h0a4.001 4.001 0 0 1-.427 4.39M6.248 9.676l1.554 1.259M4.99 11.23l1.554 1.26M3.73 12.785l1.555 1.258"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
SvgComponents["BabyBottle"] = BabyBottle;




export default SvgComponents;

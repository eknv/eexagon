import React from 'react';
import {SvgComponent} from './';

const SvgComponents:any =  {};

const AddCard = ({style, className, width, height, color}: SvgComponent) => (
  <svg width={width} height={height} viewBox="0 0 20 20" style={style} className={className}>
    <defs>
      <rect id="AddCard_svg__a" x={0} y={0} width={18} height={20} rx={3}/>
      <mask
        id="AddCard_svg__b"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={18}
        height={20}
        fill={color}
      >
        <use xlinkHref="#AddCard_svg__a"/>
      </mask>
    </defs>
    <g transform="translate(1)" fill="none" fillRule="evenodd">
      <use
        stroke={color}
        mask="url(#AddCard_svg__b)"
        strokeWidth={2}
        strokeLinecap="square"
        xlinkHref="#AddCard_svg__a"
      />
      <path
        d="M3.5 6.5h6M6.5 3.5v6M3.5 13.5h6M3.5 15.5h8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
SvgComponents["AddCard"] = AddCard;


const BabyBottle = ({style, className, width, height, color}: SvgComponent) => (
  <svg width={width} height={height} viewBox="0 0 20 20"  style={style} className={className}>
    <defs>
      <path
        d="M14.908 10.899l-6.293 7.772a3.003 3.003 0 0 1-4.22.443l-3.107-2.517a3 3 0 0 1-.445-4.219l6.294-7.772 7.771 6.293z"
        id="Baby_Bottle_svg__a"
      />
      <mask
        id="Baby_Bottle_svg__c"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={14.734}
        height={15.176}
        fill="#fff"
      >
        <use xlinkHref="#Baby_Bottle_svg__a"/>
      </mask>
      <rect id="Baby_Bottle_svg__b" x={5.652} y={4.975} width={12} height={4} rx={1}/>
      <mask
        id="Baby_Bottle_svg__d"
        maskContentUnits="userSpaceOnUse"
        maskUnits="objectBoundingBox"
        x={0}
        y={0}
        width={12}
        height={4}
        fill="#fff"
      >
        <use xlinkHref="#Baby_Bottle_svg__b"/>
      </mask>
    </defs>
    <g transform="translate(1)" stroke="#36434D" fill="none" fillRule="evenodd">
      <use
        mask="url(#Baby_Bottle_svg__c)"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="square"
        xlinkHref="#Baby_Bottle_svg__a"
      />
      <use
        mask="url(#Baby_Bottle_svg__d)"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="square"
        transform="rotate(39 11.652 6.975)"
        xlinkHref="#Baby_Bottle_svg__b"
      />
      <path
        d="M9.74 2.981a4.001 4.001 0 0 1 4.206-1.33 1.6 1.6 0 1 1 2.437 1.974h0a4.001 4.001 0 0 1-.427 4.39M6.248 9.676l1.554 1.259M4.99 11.23l1.554 1.26M3.73 12.785l1.555 1.258"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
SvgComponents["BabyBottle"] = BabyBottle;


export default SvgComponents;

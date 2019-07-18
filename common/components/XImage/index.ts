import {isNullEmpty} from "Common/utils";
import SvgComponents from './SvgComponents';
import {images, svgs} from "Common/assets";

export {default} from "./XImage";

export interface IconSegment {
  /**
   * for all
   */
  fill?: string;
  transform?: string;
  /**
   * for circle
   * note that the circle value is the radius
   */
  circle?: string;
  cx?: string;
  cy?: string;
  /**
   * for paths
   */
  path?: string;
}

export interface Icon {
  cmpName?: string;
  /** component name */
  svgName?: string;
  /** svg name */
  imgName?: string;
  /** image name */
  transform?: string;
  fill?: string;
  stroke?: string;
  strokeLinecap?: any;
  strokeLinejoin?: any;
  strokeWidth?: string;
  viewBox?: string;
  data?: IconSegment[];
}

export interface SvgComponent {
  style?: any;
  className?: string;
  width?: string;
  height?: string;
  color?: string;
}

export interface IProps {
  style?: any;
  icon?: Icon;
}

export interface IState {
}


export const iconFill = (fill: string, isParent: boolean, currentColor: string): string => {
  if (isParent && (isNullEmpty(fill) || fill != "none")) {
    return currentColor;
  }
  if (!isParent && isNullEmpty(fill)) {
    return "none"
  }
  if (!isParent && (!isNullEmpty(fill) || fill != "none")) {
    return currentColor;
  }
  return fill;
}

export const iconStroke = (stroke: string, currentColor: string): string => {
  if (!isNullEmpty(stroke) || stroke === "currentcolor") {
    return currentColor;
  }
  return stroke;
}

export const ICONS: any = {

  BUBBLE: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M512 64c282.77 0 512 186.25 512 416 0 229.752-229.23 416-512 416-27.156 0-53.81-1.734-79.824-5.044-109.978 " +
        "109.978-241.25 129.7-368.176 132.596v-26.916c68.536-33.578 128-94.74 128-164.636 " +
        "0-9.754-0.758-19.33-2.164-28.696-115.796-76.264-189.836-192.754-189.836-323.304 0-229.75 229.23-416 512-416z",
      fill: "currentcolor"
    }]
  },
  ENLARGE2: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M1024 0v416l-160-160-192 192-96-96 192-192-160-160zM448 672l-192 192 160 160h-416v-416l160 160 192-192z",
      fill: "currentcolor"
    }]
  },
  SHRINK2: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M448 576v416l-160-160-192 192-96-96 192-192-160-160zM1024 96l-192 192 160 160h-416v-416l160 160 192-192z",
      fill: "currentcolor"
    }]
  },
  BIN2: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z",
      fill: "currentcolor"
    }]
  },
  CLOUD_CHECK: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M892.268 514.49c2.442-11.108 3.732-22.646 3.732-34.49 0-88.366-71.634-160-160-160-14.224 0-28.014 1.868-41.134 " +
        "5.352-24.796-77.352-97.288-133.352-182.866-133.352-87.348 0-161.054 58.336-184.326 138.17-22.742-6.62-46.792-10.17-71.674-10.17-141.384 " +
        "0-256 114.616-256 256 0 141.382 114.616 256 256 256h608c88.366 0 160-71.632 160-160 " +
        "0-78.718-56.854-144.16-131.732-157.51zM416 768l-160-160 64-64 96 96 224-224 64 64-288 288z",
      fill: "currentcolor"
    }]
  },
  BOLD: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M707.88 484.652c37.498-44.542 60.12-102.008 60.12-164.652 0-141.16-114.842-256-256-256h-320v896h384c141.158 " +
        "0 256-114.842 256-256 0-92.956-49.798-174.496-124.12-219.348zM384 192h101.5c55.968 0 101.5 57.42 101.5 128s-45.532 " +
        "128-101.5 128h-101.5v-256zM543 832h-159v-256h159c58.45 0 106 57.42 106 128s-47.55 128-106 128z",
      fill: "currentcolor"
    }]
  },
  UNDERLINE: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M704 64h128v416c0 159.058-143.268 288-320 288-176.73 0-320-128.942-320-288v-416h128v416c0 " +
        "40.166 18.238 78.704 51.354 108.506 36.896 33.204 86.846 51.494 140.646 51.494s103.75-18.29 " +
        "140.646-51.494c33.116-29.802 51.354-68.34 51.354-108.506v-416zM192 832h640v128h-640z", fill: "currentcolor"
    }]
  },
  ITALIC: {
    viewBox: "0 0 1024 1024",
    data: [{path: "M896 64v64h-128l-320 768h128v64h-448v-64h128l320-768h-128v-64z", fill: "currentcolor"}]
  },
  PARAGRAPH_LEFT: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M0 64h1024v128h-1024zM0 256h640v128h-640zM0 640h640v128h-640zM0 448h1024v128h-1024zM0 832h1024v128h-1024z",
      fill: "currentcolor"
    }]
  },
  PARAGRAPH_CENTER: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M0 64h1024v128h-1024zM192 256h640v128h-640zM192 640h640v128h-640zM0 448h1024v128h-1024zM0 832h1024v128h-1024z",
      fill: "currentcolor"
    }]
  },
  PARAGRAPH_RIGHT: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M0 64h1024v128h-1024zM384 256h640v128h-640zM384 640h640v128h-640zM0 448h1024v128h-1024zM0 832h1024v128h-1024z",
      fill: "currentcolor"
    }]
  },
  GOOGLE: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M522.2 438.8v175.6h290.4c-11.8 75.4-87.8 220.8-290.4 220.8-174.8 0-317.4-144.8-317.4-323.2s142.6-323.2 " +
        "317.4-323.2c99.4 0 166 42.4 204 79l139-133.8c-89.2-83.6-204.8-134-343-134-283 0-512 229-512 512s229 512 512 512c295.4 " +
        "0 491.6-207.8 491.6-500.2 0-33.6-3.6-59.2-8-84.8l-483.6-0.2z", fill: "currentcolor"
    }]
  },
  FACEBOOK: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z",
      fill: "currentcolor"
    }]
  },
  TWITTER: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 " +
        "51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 " +
        "31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 " +
        "186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 " +
        "90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 " +
        "41-29.4 76.6-66.4 104.8-108.6z",
      fill: "currentcolor"
    }]
  },
  LINKEDIN2: {
    viewBox: "0 0 1024 1024",
    data: [{
      path: "M384 384h177.106v90.782h2.532c24.64-44.194 84.958-90.782 174.842-90.782 186.946 0 221.52 116.376 221.52 " +
        "267.734v308.266h-184.61v-273.278c0-65.184-1.334-149.026-96.028-149.026-96.148 0-110.82 70.986-110.82 " +
        "144.292v278.012h-184.542v-576z M64 384h192v576h-192v-576z M256 224c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 " +
        "42.981-96 96-96s96 42.981 96 96z",
      fill: "currentcolor"
    }]
  },


  TEST: {
    viewBox: "0 0 20 20",
    fill: "currentcolor",
    data: [{
      path: "M9.73921272,2.98135818 C10.7791921,1.69709064 12.4506704,1.22537815 13.9455618,1.65115398 C13.9942358,1.55788537 14.0528789,1.46806177 14.1216446,1.38314327 C14.6777471,0.696413892 15.6852614,0.590519873 16.3719908,1.14662236 C17.0587201,1.70272485 17.1646142,2.71023914 16.6085117,3.39696852 C16.539746,3.48188703 16.4640779,3.55792403 16.3829673,3.62492606 L16.3829673,3.62492606 C17.1102443,4.99862669 16.9963598,6.73165376 15.9563804,8.01592131"
    },
      {
        path: "M6.02510673,10.3055393 L8.02510673,10.3055393",
        transform: "translate(7.025107, 10.305539) rotate(-321.000000) translate(-7.025107, -10.305539)"
      },
      {
        path: "M4.76646595,11.8598312 L6.76646595,11.8598312",
        transform: "translate(5.766466, 11.859831) rotate(-321.000000) translate(-5.766466, -11.859831)"
      },
      {
        path: "M3.50782517,13.4141231 L5.50782517,13.4141231",
        transform: "translate(4.507825, 13.414123) rotate(-321.000000) translate(-4.507825, -13.414123)"
      }
    ]
  },

  HEART: {
    viewBox: "0 0 32 32",
    data: [
      {
        path: "M 4 16 C 1 12 2 6 7 4 C 12 2 15 6 16 8 C 17 6 21 2 26 4 C 31 6 31 12 28 16 C 25 20 16 28 16 28 C 16 28 7 20 4 16 Z",
        fill: "currentcolor"
      },
    ]
  },

  I_SEARCH: {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentcolor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3",
    data: [
      {circle: "12", cx: "14", cy: "14"},
      {path: "M23 23 L30 30"},
    ],
  },

  I_CARET_TOP: {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentcolor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    data: [
      {path: "M30 22 L16 6 2 22 Z"},
    ],
  },

  I_CARET_BOTTOM: {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentcolor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    data: [
      {path: "M30 10 L16 26 2 10 Z"},
    ],
  },

};


/**
 * iterate over all the defined SvgComponents and create a reference in the ICONS object
 * it adds an entry like this:
 * AddCard_svg: {componentName: "AddCard"}
 */
for (const iconKey in SvgComponents) {
  if (SvgComponents.hasOwnProperty(iconKey)) {
    ICONS[`${iconKey}_cmp`] = {cmpName: iconKey};
  }
}


/**
 * iterate over all the defined images and create a reference in the ICONS object
 * it adds an entry like this:
 * Logo_img: {imageName: "Logo"}
 */
for (const imageKey in images) {
  if (images.hasOwnProperty(imageKey)) {
    ICONS[`${imageKey}_img`] = {imgName: imageKey};
  }
}

/**
 * iterate over all the svgs and create a reference in the ICONS object
 * it adds an entry like this:
 * AddCard_svg: {svgName: "Logo"}
 */
for (const svgKey in svgs) {
  if (svgs.hasOwnProperty(svgKey)) {
    ICONS[`${svgKey}_svg`] = {svgName: svgKey};
  }
}





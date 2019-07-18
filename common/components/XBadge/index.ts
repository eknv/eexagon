import {Icon} from 'X/XImage';

export {default} from './XBadge';

export enum XBadgeTheme {
  primary = "primary",
  success = "success",
  info = "info",
  warning = "warning",
  danger = "danger",

  /* m- */

  /* w- */
  light = "light",
  dark = "dark",
  secondary = "secondary",
}

export enum IconPlacement {
  left = "left",
  right = "right"
}


export interface IProps {

  theme?: XBadgeTheme; // color
  style?: any;
  icon?:Icon;
  iconStyle?:any;
  iconPlacement?: IconPlacement;
  content?:string;
  contentStyle?:any;

  /* m- */


  /* w- */
  pill?: boolean;

}


export interface IState {
}

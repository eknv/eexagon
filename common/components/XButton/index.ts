export {default} from './XButton';

export enum XButtonTheme {

  primary = "primary",
  success = "success",
  info = "info",
  warning = "warning",
  danger = "danger",

  /* Just mobile */
  light = "light",
  dark = "dark",

  /* Just web */
  link = "link",
  ghost = "ghost",
  dashed = "dashed"


}

export enum XButtonIconAlignment {
  left = "left",
  right = "right"
}

export enum XButtonSize {
  small = "small", // sm
  large = "large" // lg
}

export const XButtonSizeMapper = (name: string): string => {
  if (name === XButtonSize.large) {
    return 'lg';
  } else if (name === XButtonSize.small) {
    return 'sm';
  } else {
    throw new Error(`#E XButtonSize Mapper, wrong name: ${name}`)
  }
}

export interface IProps {

  active?: boolean;
  disabled?: boolean;
  theme?: XButtonTheme; // color
  size?: XButtonSize;
  block?: boolean;
  onPress?: () => void;
  style?: object;
  content?: string;
  isLoading?: boolean;

  /* m- */
  transparent?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  full?: boolean;
  iconAlignment?: XButtonIconAlignment;
  iconName?: string;
  imageName?: string;
  imageStyle?: object;

  /* w- */
  htmlType?:any;
}


export interface IState {
}

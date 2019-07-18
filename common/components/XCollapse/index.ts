export { default } from './XCollapse';

/**
 * Note that this component needs two children
 * the first one is used to control the opening and closing of the collapse area
 * the second one is or contains the collapse area
 */

export interface IProps {
  isOpen?: boolean; // controls if the collapse component is open or closed
  style?: object;  // style of the whole component
  cStyle?: object; // style of the collapse component
  className?: string;  // class of the whole component
  cClassName?: string; // class of the collapse component
}

export interface IState {
  children: any[]; // this field keep the children in a variable
}

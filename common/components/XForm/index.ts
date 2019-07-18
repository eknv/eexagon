import React from "react";

export {default} from './XForm';

export const XFormContext = React.createContext({});

export interface IProps {
  submit?: (values: any[]) => void;
  style?: object;

  /**
   * antd form object
   */
  form: any;

  // obsolete, should change the logic to have one for each direction
  centered?: boolean;
  //todo
  centeredVertical?: boolean;
  centeredHorizontal?: boolean;
}

export interface IState {
}

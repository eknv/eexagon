export {default} from './XGroup';

export interface IProps {
  style?: object;
  className?: string;
  children?: object;
  onPress?: () => void;

  // obsolete, should change the logic to have one for each direction
  centered?: boolean;
  //todo
  centeredVertical?: boolean;
  centeredHorizontal?: boolean;
}

export interface IState {
}

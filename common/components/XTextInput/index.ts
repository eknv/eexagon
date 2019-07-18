export {default} from './XTextInput';

export interface IProps {
  placeholder?: string;
  onChange?: (event: any) => void;
  value?: string;
  //this is a workaround since the onChange triggers a reload and makes the component to lose the focus
  _onChange?: (value: any) => void;

}

export interface IState {
}


export {default} from './XFormItem';

export interface IProps {
  formItemLayout?: object;
  label?: string;
  showLabel?:boolean;
  required?: boolean;
  validateTrigger?: string[];
  rules?: object;
  type?:string;
}

export interface IState {
  uniqueID: string;
}

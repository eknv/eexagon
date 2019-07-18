export {default} from './XSelect';


export interface OptionType {
  value: string;
  label: string;
}

export interface IProps {
  style?: object;
  className?: string;
  isMulti?: boolean;
  value?: OptionType | OptionType[];
  onChange?: (currentSelectedOptions: OptionType | OptionType[]) => void;
  options?: OptionType[];
  placeholder?: string;
}


export interface IState {
  _options?: any;
  _optionsKeyValue?: any;
}

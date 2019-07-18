export {default} from './XTabs';


export interface IProps {
  tabStyle?: object;
  tabClassName?: string;
  contentStyle?: object;
  contentClassName?: string;
  activeTab?: number;
}

export interface IState {
  activeTab?: number;
  children: any[];
}

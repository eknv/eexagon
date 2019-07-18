import {isNullEmpty} from 'Common/utils';

export const navigate = async (props: any, webPath: string, webSearch: string, webParams: any, mobileDestination: string, mobileParams: any) => {
  if (isNullEmpty(mobileDestination)) {
    return;
  }
  const {navigate} = props.navigation;
  navigate(mobileDestination, mobileParams);
}

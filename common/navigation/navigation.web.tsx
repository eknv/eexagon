import {isNullEmpty, isNull} from 'Common/utils';

export const navigate = async (props: any, webPath: string, webSearch: string, webParams: any, mobileDestination: string, mobileParams: any) => {

  if (isNullEmpty(webPath)) {
    return;
  }

  if (isNull(props.history)) {
    console.warn('props.history is not available!')
    return;
  }

/*  props.history.push({
    pathname: '/template',
    search: '?query=abc',
    state: { detail: response.data }
  })*/

  let arg = {
    pathname: webPath,
    search: webSearch,
    state: webParams
  }
  props.history.push(arg)
}


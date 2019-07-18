export {default} from './XPaginatedList';

export interface IProps {

  items: any[];
  itemComponentFunc: (item: any, index: number) => any;
  isLoading?: boolean;
  containerStyle?: any;
  keyExtractorFunc?: (item: any, index: number) => string;  // necessary for rendering lists

  /**
   * web only
   */
  wForcePage?: number;
  wPreviousLabel?: string;
  wNextLabel?: string;
  wBreakLabel?: string;
  wPageCount?: number;
  wMarginPagesDisplayed?: number;
  wPageRangeDisplayed?: number;
  wOnPageChange?: (data: any) => any;
  wCssProfile?: string;

  /**
   * mobile only
   */

  mLoadMoreData?: (data: any) => any;
  mLoadMoreComponent?: any;
  mLoadMoreWrapperStyle?: any;
  mLoadMoreButtonStyle?: any;
  mLoadMoreContent?: string;

  mItemSeparatorComponent?: any;
  mSeparatorStyle?: any;

  // pagination component
  mHorizontal?: boolean;
  mNrBefore?: number;
  mNrVisible?: number;
  mNrAfter?: number;
  mLinkStyle?: any;
  mDotsStyle?: any;
  mIconStyle?: any;
  mContainerStyle?: any;
  mPaginationStyle?: any;
  mDotAnimation?: any;

}

export interface IState {
  changed: boolean;
  viewableItems: any[]
}

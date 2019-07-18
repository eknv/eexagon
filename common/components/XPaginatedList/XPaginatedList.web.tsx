import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import ReactPaginate from 'react-paginate';
import {isNull, isNullEmpty, isArrayNullEmpty, defaults} from "Common/utils";
import XGroup from 'X/XGroup';


class XPaginatedList extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {

    const {wCssProfile} = this.props;
    let _cssProfile = "1";
    if (!isNullEmpty(wCssProfile)) {
      _cssProfile = wCssProfile;
    }
    import(`X/XPaginatedList/css/XPaginate${_cssProfile}.scss`);
  }

  render() {

    const {
      items, itemComponentFunc, wForcePage, wPreviousLabel,
      wNextLabel, wBreakLabel, wPageCount, wMarginPagesDisplayed,
      wPageRangeDisplayed, wOnPageChange
    } = this.props;

    const _disableInitialCallback = true;
    const _forcePage = defaults(wForcePage, 0);
    const _previousLabel = defaults(wPreviousLabel, 'previous');
    const _nextLabel = defaults(wNextLabel, 'next');
    const _breakLabel = defaults(wBreakLabel, '...');
    const _marginPagesDisplayed = defaults(wMarginPagesDisplayed, 2);
    const _pageRangeDisplayed = defaults(wPageRangeDisplayed, 3);
    const _onPageChange = defaults(wOnPageChange, (() => {
      console.warn("#E wOnPageChange is not provided yet!");
    }));

    return (
      <Fragment>

        {!isArrayNullEmpty(items) &&
        items.map(itemComponentFunc)
        }

        {!isArrayNullEmpty(items) &&
        <XGroup centered={true}>
          <ReactPaginate
            forcePage={_forcePage}
            disableInitialCallback={_disableInitialCallback}
            previousLabel={_previousLabel}
            nextLabel={_nextLabel}
            breakLabel={_breakLabel}
            pageCount={wPageCount}
            marginPagesDisplayed={_marginPagesDisplayed}
            pageRangeDisplayed={_pageRangeDisplayed}
            onPageChange={_onPageChange}
            breakClassName={'break'}
            containerClassName={'pagination'}
            activeClassName={'active'}
            disabledClassName={'disabled'}
            pageClassName={'page'}
            pageLinkClassName={'pageLink'}
            previousClassName={'previous'}
            nextClassName={'next'}
          />
        </XGroup>
        }

      </Fragment>
    );
  }
}

export default XPaginatedList;

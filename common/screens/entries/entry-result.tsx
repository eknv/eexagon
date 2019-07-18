import React, {Component, Fragment} from 'react';
import {withApollo} from 'react-apollo';
import {compose} from 'recompose';
import retrieveLocalEntrySearchCriteria from 'Common/gql/entries/retrieve-local-entry-search-criteria';
import GetSearchEntriesQuery from 'Common/gql/entries/search-entries';
import {isNull} from 'Common/utils';
import Entry from './entry';
import {IEntry} from 'Common/interfaces/entries';
import EntryDTO from 'Common/dto/EntryDTO';
import XPaginatedList from 'X/XPaginatedList';
import XBadge, {XBadgeTheme} from "X/XBadge";
import {ICONS} from "X/XImage";

interface IProps {
  client: any;
  data: any;
}

interface IState {
  entries: IEntry[],
  queryVariable: { entryDTOs: EntryDTO[], skip: number, first: number },
  count: number,
  currentPage: number
}


class EntryResult extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      entries: [],
      queryVariable: {skip: 0, first: 10, entryDTOs: []},
      count: 0,
      currentPage: 0
    };
  }

  componentDidMount() {
    this.querySubscription = this.props.client.watchQuery({
      query: retrieveLocalEntrySearchCriteria,
      variables: {},
      fetchPolicy: 'cache-only',
    })
      .subscribe(({data}: any) => {
        if (data == null || data.localEntrySearchCriteria == null) {
          return;
        }

        const queryVariable = JSON.parse(data.localEntrySearchCriteria.queryVariable);
        let selected = 0;
        if (!isNull(queryVariable)) {
          selected = queryVariable.skip / queryVariable.first;
        }
        this.setState({queryVariable: queryVariable, currentPage: selected});

        const dataQuery = this.props.client.query({
          query: GetSearchEntriesQuery(1, new Map()),
          variables: queryVariable,
          fetchPolicy: 'cache-only',
        });

        dataQuery.then((data: any) => {
          if (!isNull(data.data) && !isNull(data.data.searchEntries)) {
            const {entries, count} = data.data.searchEntries;
            this.setState({entries, count});
          }
        });
      });
  }


  componentWillUnmount() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }


  handlePaginationPageClick = (data: any) => {
    let selected = data.selected;
    let skip = Math.ceil(selected * this.state.queryVariable.first);
    this.state.queryVariable.skip = skip;
    this.setState({queryVariable: this.state.queryVariable, currentPage: selected});

    const dataQuery = this.props.client.watchQuery({
      query: GetSearchEntriesQuery(1, new Map()),
      variables: this.state.queryVariable,
      fetchPolicy: 'cache-and-network',
    });
    dataQuery.subscribe((data: any) => {
      if (!isNull(data.data) && !isNull(data.data.searchEntries)) {
        const {entries, count} = data.data.searchEntries;
        this.setState({entries: entries});
      }
    });
  }


  mLoadMoreData = (numberOfEntriesToSkip: number) => () => {
    if (isNull(numberOfEntriesToSkip)) {
      numberOfEntriesToSkip = 0;
    }
    let currentPage = parseInt(numberOfEntriesToSkip / this.state.queryVariable.first);

    this.state.queryVariable.skip = numberOfEntriesToSkip;
    this.setState({queryVariable: this.state.queryVariable, currentPage});

    const dataQuery = this.props.client.watchQuery({
      query: GetSearchEntriesQuery(1, new Map()),
      variables: this.state.queryVariable,
      fetchPolicy: 'cache-and-network',
    });
    dataQuery.subscribe((data: any) => {
      if (!isNull(data.data) && !isNull(data.data.searchEntries)) {
        const {entries, count} = data.data.searchEntries;
        this.setState({entries: this.state.entries.concat(entries)});
      }
    });
  }


  render() {

    const {entries, currentPage, count, queryVariable} = this.state;

    const _entryComponentFunc = (entry: IEntry, index: number) => {
      return <Entry key={entry.id} entry={entry} hasNextLevel={true}/>
    };

    const _pageCount = !isNull(queryVariable) && !isNull(queryVariable.first) && queryVariable.first != 0
      ? Math.ceil(count / queryVariable.first)
      : 0;

    return (
      <Fragment>

        <XBadge
          style={{padding: 20}}
          m-style={{width: 200, backgroundColor: 'gray', maxHeight: 60, padding: 20}}
          w-pill={true}
          w-theme={XBadgeTheme.info}
          w-contentStyle={{fontSize: 30}}
          m-contentStyle={{color: 'white', fontSize: 20}}
          content="Entry Result"
          icon={ICONS.AddCard_cmp}
          iconStyle={{color: "red", height: 40}}
        />

        <XPaginatedList
          items={entries}
          itemComponentFunc={_entryComponentFunc}
          wCssProfile="1"
          wForcePage={currentPage}
          wPageCount={_pageCount}
          wOnPageChange={this.handlePaginationPageClick}
          mLoadMoreData={this.mLoadMoreData}
        />

      </Fragment>
    );
  }
}

export default compose(withApollo)(EntryResult);

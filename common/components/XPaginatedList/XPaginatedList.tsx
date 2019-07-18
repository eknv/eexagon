import React, {Component, Fragment} from 'react'
import {
  View,
  FlatList
} from 'react-native';
import {IProps, IState} from './';
import XPagination from './XPagination';
import XButton from "X/XButton";
import XGroup from "X/XGroup";
import {isNull, isNullEmpty, isArrayNullEmpty} from 'Common/utils';
import XText from "X/XText";

class XPaginatedList extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      changed: false,
      viewableItems: []
    }
    ;
  }

  footerComponent = () => {
    const {
      mLoadMoreComponent, mLoadMoreData, isLoading,
      mLoadMoreButtonStyle, mLoadMoreWrapperStyle, mLoadMoreContent, items
    } = this.props;

    const _loadMoreButtonStyle = Object.assign(styles.loadMoreButton, mLoadMoreButtonStyle);
    const _footerStyle = Object.assign(styles.footer, mLoadMoreWrapperStyle);
    const _loadMoreContent = !isNullEmpty(mLoadMoreContent) ? mLoadMoreContent : "Load more";

    if (isArrayNullEmpty(items)) {
      return <XText></XText>
    } else if (!isNull(mLoadMoreComponent)) {
      return mLoadMoreComponent;
    } else {
      return (
        <View style={_footerStyle}>
          <XButton
            isLoading={isLoading}
            onPress={mLoadMoreData(items.length)}
            style={_loadMoreButtonStyle}
            content={_loadMoreContent}
          >
          </XButton>
        </View>
      );
    }
  }

  separatorComponent = () => {
    const {mItemSeparatorComponent, mSeparatorStyle} = this.props;
    const _separatorStyle = Object.assign(styles.separator, mSeparatorStyle);
    if (!isNull(mItemSeparatorComponent)) {
      return mItemSeparatorComponent;
    } else {
      return (
        <View style={_separatorStyle}/>
      );
    }
  }

  onViewableItemsChanged = ({viewableItems, changed}) => {
    this.setState({viewableItems, changed});
  }

  render() {

    const self = this;
    const {
      items, itemComponentFunc, containerStyle, keyExtractorFunc,
      // pagination component properties
      mHorizontal, mNrBefore, mNrVisible, mNrAfter, mLinkStyle, mDotsStyle,
      mIconStyle, mContainerStyle, mPaginationStyle, mDotAnimation
    } = this.props;

    const _containerStyle = Object.assign(styles.container, containerStyle);
    const _keyExtractorFunc = !isNullEmpty(keyExtractorFunc) ? keyExtractorFunc : (item, index) => index.toString();

    /** extract the item out of the entry */
    const _itemComponentFunc = (entry: any, index: number) => {
      return itemComponentFunc(isNull(entry) ? entry : entry.item, index);
    }

    return (
      <Fragment>

        <XGroup style={_containerStyle}>
          {!isArrayNullEmpty(items) &&
          <FlatList
            style={{width: '100%'}}
            keyExtractor={_keyExtractorFunc}
            data={items}
            ref={(ref) => {
              self.flatListRef = ref;
            }}
            renderItem={_itemComponentFunc}
            ListFooterComponent={this.footerComponent}
            ItemSeparatorComponent={this.separatorComponent}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />
          }
        </XGroup>

        {!isArrayNullEmpty(items) &&
        <XPagination
          paginationVisibleItems={this.state.viewableItems}
          paginationItems={items}

          linkOnPress={(item) => {
            self.flatListRef.scrollToItem({animated: true, item: item});
          }}
          startLinkOnPress={(item) => {
            self.flatListRef.scrollToOffset({offset: 0, animated: true});
          }}
          endLinkOnPress={(item) => {
            self.flatListRef.scrollToEnd({animated: true, item: item});
          }}

          horizontal={mHorizontal}
          nrBefore={mNrBefore}
          nrVisible={mNrVisible}
          nrAfter={mNrAfter}
          linkStyle={mLinkStyle}
          dotsStyle={mDotsStyle}
          iconStyle={mIconStyle}
          containerStyle={mContainerStyle}
          paginationStyle={mPaginationStyle}
          dotAnimation={mDotAnimation}
        />
        }

      </Fragment>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#800000',
    color: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
};


export default XPaginatedList;

import React, {Component} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  View, Text
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {isArrayNullEmpty, isNull, asArray} from 'Common/utils';
import XImage, {ICONS} from "X/XImage";


/**
 * open TODO:
 * - put one number of the visible range inside dots like ...20...
 * - users should provide just the number of entries that should be
 * displayed from outside the visible range.. not before and after
 * - the logic should display more pagination links the bigger the
 * respective range is.. if we are rather on the beginning, more links
 * should be displayed for the after range and vice versa
 */

enum Position {
  First,
  Last,
  Other,
  DOTS
}

export interface IProps {

  paginationItems: any[];         // all items
  paginationVisibleItems: any[];  // currently visible items

  linkOnPress?: () => void;         // onPress callback on pagination links
  startLinkOnPress?: () => void;    // onPress callback on the start dot
  endLinkOnPress?: () => void;      // onPress callback on the end dot

  horizontal?: boolean;            // horizontal vs vertical
  nrBefore?: number;               // maximum number of pagination links for the range before the visible items
  nrVisible?: number;              // maximum number of pagination links for the visible items
  nrAfter?: number;                // maximum number of pagination links for the range after the visible items

  linkStyle?: any;                  // pagination links' style
  dotsStyle?: any;                  // pagination dots' style
  iconStyle?: any;                  // pagination icon styles
  containerStyle?: any;            // container style
  paginationStyle?: any;           // the horizontal / vertical placement of the pagination can be overridden using this property

  dotAnimation?: any;              // alternate animation
}

interface IState {
  paginationItems: any[];
}


class XPagination extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const {paginationItems} = this.props;
    this.state = {
      paginationItems: XPagination.indexItems(paginationItems)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (asArray(nextProps.paginationItems).length !== asArray(prevState.paginationItems).length) {
      return {paginationItems: XPagination.indexItems(nextProps.paginationItems)};
    } else return null;
  }

  static indexItems(items: any[]) {
    if (isArrayNullEmpty(items)) {
      return items;
    }
    let _items = [];
    for (let index = 0; index < items.length; index++) {
      const newItem = {index: index, item: items[index]};
      _items.push(newItem);
    }
    return _items;
  }

  componentDidMount() {
  }

  calcIncrement = (rangeLength: number, selectionLength: number) => {
    return rangeLength < selectionLength ? 1 : parseInt(rangeLength / selectionLength);
  }

  fillRangeArray = (rangeArray: any[], startIndex: number, endIndex: number, increment: number, maxEntries: number) => {
    const {paginationItems} = this.state;
    let counter = 0;
    for (let index = startIndex; index < endIndex; index = index + increment) {
      if (!isNull(maxEntries) && counter === maxEntries) {
        return
      }
      counter++;
      rangeArray.push(paginationItems[index]);
    }
  }

  /**
   * this method is responsible for creating all the different kind of pagination links
   * @param indexedItem list items along with the respective indexes
   * @param prefix  used for debugging to differentiate between the different pagination link types (before, visible, after)
   * @param position  this enum is used to differentiate between the different pagination link types
   */
  dotComponent = (indexedItem: { index: number, item: string }, prefix: string, position: Position) => {
    const {horizontal, linkStyle, dotsStyle, iconStyle, linkOnPress, startLinkOnPress, endLinkOnPress} = this.props;

    const _prefix = ""; // use the provided prefix for debugging

    let _onPress = null;
    let _key = -1;
    if (position === Position.Other) {
      _onPress = () => linkOnPress(indexedItem.item);
      _key = indexedItem.index;
    } else if (position === Position.First) {
      _onPress = () => startLinkOnPress(indexedItem.item);
      _key = "first";
    } else if (position === Position.Last) {
      _onPress = () => endLinkOnPress(indexedItem.item);
      _key = "last";
    } else if (position === Position.DOTS) {
      _key = `dots_${indexedItem.index}`;
    }

    const _iconStyle = Object.assign(
      {
        width: 15,
        color: 'rgba(0,0,0,.3)',
        transform: horizontal ? [{rotate: '270deg'}] : [],
      }, iconStyle);
    const _linkStyle = Object.assign(
      {
        color: 'rgba(0,0,0,.3)'
      }, linkStyle);
    const _dotsStyle = Object.assign(
      {
        color: 'rgba(0,0,0,.3)',
        transform: !horizontal ? [{rotate: '90deg'}] : [],
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 13,
        flexWrap: 'nowrap',
        paddingVertical: horizontal ? 0 : 50,
        paddingHorizontal: horizontal ? 10 : 0,
      }, dotsStyle);

    return (
      <TouchableOpacity
        onPress={_onPress}
        style={[
          {
            flex: position === Position.DOTS ? 0 : 1,
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }
        ]}
        key={_key}
      >
        {position === Position.First &&
        <XImage icon={ICONS.I_CARET_TOP} style={_iconStyle}/>
        }
        {position === Position.DOTS &&
        <Text style={[_dotsStyle]}
        >. . .</Text>
        }
        {position === Position.Other &&
        <Text style={_linkStyle}>{_prefix}{indexedItem.index}</Text>
        }
        {position === Position.Last &&
        <XImage icon={ICONS.I_CARET_BOTTOM} style={_iconStyle}/>
        }
      </TouchableOpacity>
    )
  }


  render() {

    /**
     * Properties
     */
    const {
      containerStyle,
      paginationVisibleItems,   /** visible items */
      horizontal,
      dotAnimation,
      paginationStyle
    } = this.props;

    const {paginationItems} = this.state; /*all items indexed internally*/

    if (isArrayNullEmpty(paginationVisibleItems) || isArrayNullEmpty(this.props.paginationItems)) {
      return (<View></View>)
    }

    const _visibleStartIndex = paginationVisibleItems[0].index;
    const _visibleEndIndex = paginationVisibleItems[paginationVisibleItems.length - 1].index;

    const _nrBefore = 4, _nrVisible = 1, _nrAfter = 4;
    const _beforeArray = [], _visibleArray = [], _afterArray = [];

    const _increment_before = this.calcIncrement(_visibleStartIndex, _nrBefore);
    const _increment_visible = this.calcIncrement(paginationVisibleItems.length, _nrVisible);
    const _increment_after = this.calcIncrement(paginationItems.length - _visibleEndIndex, _nrAfter);
    // console.log(`_increment_before: ${_increment_before}, _increment_visible: ${_increment_visible}, _increment_after: ${_increment_after}`);

    this.fillRangeArray(_beforeArray, 0, _visibleStartIndex, _increment_before, _nrBefore);
    this.fillRangeArray(_visibleArray, _visibleStartIndex + 1, _visibleEndIndex, _increment_visible, _nrVisible);
    this.fillRangeArray(_afterArray, _visibleEndIndex + 1, paginationItems.length, _increment_after, _nrAfter);

    const _firstIndexedItem = {index: 0, item: paginationItems[0]};
    const _lastIndexedItem = {index: paginationItems.length - 1, item: paginationItems[paginationItems.length - 1]};

    let
      verticalStyle = {
        flex: 1,
        flexDirection: 'column',
        height,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        margin: 0,
        bottom: 0,
        right: 0,
        bottom: 0,
        padding: 0,
      },
      horizontalStyle = {
        flex: 1,
        flexDirection: 'row',
        width,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        margin: 0,
        top: 10,
        left: 0,
        right: 0,
        padding: 0,
      };

    if (horizontal === true) PaginationContainerStyle = horizontalStyle;
    else if (paginationStyle) PaginationContainerStyle = paginationStyle;
    else PaginationContainerStyle = verticalStyle;

    return (
      <View style={[
        PaginationContainerStyle,
        containerStyle
      ]}
      >
        <View style={[
          {
            flex: 1,
            marginTop: horizontal === true ? 0 : 20,
            marginBottom: horizontal === true ? 0 : 20,
            marginLeft: horizontal === true ? 5 : 0,
            marginRight: horizontal === true ? 5 : 0,
            width: horizontal === true ? width : 40,
            height: horizontal === false ? height : 30,
            flexDirection: horizontal == true ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        >
          {/*Start DOT*/}
          {this.dotComponent(_firstIndexedItem, "", Position.First)}

          {/* Before Array */}
          {_beforeArray.map((item, i) => {
            LayoutAnimation.configureNext(dotAnimation);
            return this.dotComponent(item, "a", Position.Other);
          })}

          {/* 3 dots ... */}
          {!isArrayNullEmpty(_beforeArray) &&
          this.dotComponent(_firstIndexedItem, "", Position.DOTS)
          }

          {/* Visible Array */}
          {_visibleArray.map((item, i) => {
            LayoutAnimation.configureNext(dotAnimation);
            return this.dotComponent(item, "b", Position.Other);
          })}

          {/* 3 dots ... */}
          {!isArrayNullEmpty(_afterArray) &&
          this.dotComponent(_lastIndexedItem, "", Position.DOTS)
          }

          {/* After Array */}
          {_afterArray.map((item, i) => {
            LayoutAnimation.configureNext(dotAnimation);
            return this.dotComponent(item, "c", Position.Other);
          })}

          {/*End Dot*/}
          {this.dotComponent(_lastIndexedItem, "", Position.Last)}

        </View>
      </View>
    );
  }
}

export default XPagination;


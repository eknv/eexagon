import React, {Component, Fragment} from 'react';
import XText from "X/XText";
import XPaginatedList from "X/XPaginatedList";
import {isNull, asArray, objectFieldsAsArray} from "Common/utils";


export interface IProps {
}

export interface IState {
  isLoading: boolan;
  items: string[];
}

class LoginScreen extends Component<IProps & IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: false,
      items: this.newItems(),
    };
  }

  newItems = (startIndex: number): string[] => {
    const items = [];
    startIndex = isNull(startIndex) ? 0 : startIndex;
    for (let i = startIndex; i < startIndex + 30; i++) {
      items.push(`This is the entry number ${i} `);
    }
    return items;
  }

  loadMoreData = (): void => {
    const self = this;
    self.setState({
      isLoading: true
    });
    setTimeout(function () {
      const _newItems = self.newItems(self.state.items.length);
      console.log("_newItems................................", _newItems)
      self.state.items = self.state.items.concat(_newItems)
      self.setState({
        items: self.state.items,
        isLoading: false
      });
    }, 1500);
  }


  render() {

    const {items, isLoading} = this.state;

    const _itemComponentFunc = ({item, index}) => {
      //console.log(`item at ${index}: ${asArray(item)}`);
      return <XText
        style={{color: "brown", backgroundColor: "white", textAlign: 'center', marginBottom: 5}}>{item}</XText>
    };

    return (
      <XPaginatedList
        items={items}
        itemComponentFunc={_itemComponentFunc}
        mLoadMoreData={this.loadMoreData}
        isLoading={isLoading}/>
    )
  }

}

LoginScreen.navigationOptions = {
  title: 'Login',
};

export default LoginScreen;

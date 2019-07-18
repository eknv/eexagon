import React, {Component} from 'react';
import {IProps, IState} from './';
import {isArrayNullEmpty} from "Common/utils";
import {Container, Header, Tab, Tabs, TabHeading, ScrollableTab, Icon, Text} from 'native-base';
import {View, ScrollView} from 'react-native';


class XTabs extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      children: [],
      activeTab: props.activeTab || 0
    };
  }

  componentDidMount() {
    const _children = React.Children.toArray(this.props.children);
    this.setState({
      children: _children
    });

    if (isArrayNullEmpty(_children)
      || _children.length % 2 != 0) {
      throw new Error(`#E Number of child-elements "${_children.length}" is not a multiplication of "2"!`)
    }
  }

  render() {

    const {tabStyle, tabClassName, contentStyle, contentClassName, activeTab} = this.props;
    const {children} = this.state;

    /**
     * tab definitions
     */
    const _tabs = [];
    for (let index = 0; index < children.length; index = index + 2) {
      _tabs.push(
        <Tab
          style={contentStyle}
          key={index}
          heading={
            <TabHeading style={tabStyle}>
              {children[index]}
            </TabHeading>
          }
        >
          <View>
            {children[index + 1]}
          </View>

        </Tab>
      );
    }

    return (
      <Tabs
        initialPage={activeTab}
        renderTabBar={() => <ScrollableTab style={tabStyle}/>}
      >
        {_tabs}
      </Tabs>
    );
  }
}

export default XTabs;

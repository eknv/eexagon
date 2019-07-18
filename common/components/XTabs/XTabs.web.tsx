import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {isArrayNullEmpty} from "Common/utils";

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

  toggleTabs(tab: number) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    const {tabStyle, tabClassName, contentStyle, contentClassName} = this.props;
    const {activeTab, children} = this.state;

    /**
     * tab definitions
     */
    const _tabs = [];
    for (let index = 0; index < children.length; index=index+2) {
      _tabs.push(
        <NavItem key={index}>
          <NavLink
            className={classnames({active: activeTab === index})}
            onClick={() => {
              this.toggleTabs(index);
            }}
          >
            {children[index]}
          </NavLink>
        </NavItem>
      );
    }

    /**
     * tab panes definitions
     */
    const tabPanes = [];
    for (let index = 1; index < children.length; index=index+2) {
      tabPanes.push(
        <TabPane tabId={index-1} key={index}>
          {children[index]}
        </TabPane>
      );
    }

    return (
      <Fragment>

        <Nav
          tabs
          style={tabStyle}
          className={tabClassName}
        >
          {_tabs}
        </Nav>

        <TabContent
          activeTab={activeTab}
          style={contentStyle}
          className={contentClassName}
        >
          {tabPanes}
        </TabContent>

      </Fragment>
    );
  }
}

export default XTabs;

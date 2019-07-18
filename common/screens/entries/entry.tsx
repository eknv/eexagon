import React from 'react';
import './entry.scss';
import {IEntry, IRelatedEntry, IAttributeValueWrapper} from 'Common/interfaces/entries';
import {isArrayNullEmpty, stringify} from 'Common/utils';
import XButton, {XButtonTheme, XButtonSize} from 'X/XButton';
import XCollapse from "X/XCollapse";
import XText from "X/XText";
import XGroup from "X/XGroup";


interface IProps {
  entry: IEntry;
  hasNextLevel: boolean;
}

interface IState {
  collapse: boolean;
}

class Entry extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {collapse: true};
  }

  toggleRelated = () => {
    this.setState({collapse: !this.state.collapse});
  }


  render() {
    const {entry, hasNextLevel} = this.props;
    return (
      <XGroup className="entry">
        <XText className="header">{entry.title}</XText>
        <XText className="content">{entry.content}</XText>

        <XGroup className="attributes">
          <XText className="attribute title"> Tags: </XText>
          {entry.attributeValues && entry.attributeValues.map(function ({attributeValue}: IAttributeValueWrapper, index: number) {
            return <XText className="attribute" key={index}> {attributeValue.value} </XText>
          })}
        </XGroup>

        {hasNextLevel && !isArrayNullEmpty(entry.relatedEntriesFrom) &&
        <XCollapse className="relatedEntries" isOpen={!this.state.collapse}>
          <XButton
            theme={XButtonTheme.link}
            size={XButtonSize.small}
            onPress={this.toggleRelated}
            content={`related entries (${entry.relatedEntriesFrom.length})`}
          />
          <XGroup>
            {entry.relatedEntriesFrom && entry.relatedEntriesFrom.map(function ({to}: IRelatedEntry, index: number) {
              return <Entry key={index} entry={to} hasNextLevel={false}/>
            })}
          </XGroup>
        </XCollapse>
        }

      </XGroup>
    );
  }
}

export default Entry;

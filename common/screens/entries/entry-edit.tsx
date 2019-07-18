import React, {Fragment} from 'react';
import XBadge, {XBadgeTheme} from "X/XBadge";
import {ICONS} from "X/XImage";

export default class EntryEdit extends React.Component {
  render() {
    return (
      <XBadge
        style={{padding:20}}
        m-style={{width:200, backgroundColor: 'gray', height:60}}
        w-pill={true}
        w-theme={XBadgeTheme.info}
        w-contentStyle={{fontSize:30}}
        m-contentStyle={{color:'white', fontSize:30}}
        content="Entry Edit"
        icon={ICONS.AddCard_cmp}
        iconStyle={{color: "red", height:40}}
      />
    );
  }
}

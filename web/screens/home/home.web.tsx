import React, {Component, Fragment} from 'react';
import XBadge, {XBadgeTheme} from "X/XBadge";
import {ICONS} from "X/XImage";
import XBR from 'X/XBR';
import XForm from "X/XForm";
import XFormItem from "X/XFormItem";
import XTextInput from "X/XTextInput";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <XBadge
          style={{padding: 20}}
          m-style={{width: 200, backgroundColor: 'gray', height: 60}}
          w-pill={true}
          w-theme={XBadgeTheme.info}
          w-contentStyle={{fontSize: 30}}
          m-contentStyle={{color: 'white', fontSize: 30}}
          content="Welcome Home"
          icon={ICONS.AddCard_cmp}
          iconStyle={{color: "red", height: 40}}
        />
        <XBR count={3}/>
        {/*<DatePicker/>*/}


        <XForm submit={(values: any[]) => console.log(`...ìnside submit...`)}>
          <XFormItem
            label={"first Item"}
          >
           <XTextInput placeholder={"enter something"}/>
          </XFormItem>
          <XFormItem
            label={"second Item"}
          >
            <XTextInput placeholder={"enter something here as well"}/>
          </XFormItem>
        </XForm>

      </Fragment>

    );
  }
}


export default Home;

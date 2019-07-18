import React, {Component} from 'react';
import XTextInput from "X/XTextInput";
import XFormItem from "X/XFormItem";
import XForm from "X/XForm";
import XButton, {XButtonSize} from "X/XButton";
import {stringify} from "Common/utils";


export interface IProps {
}

export interface IState {
}


class FormScreen extends Component<IProps & IState> {

  constructor(props: IProps) {
    super(props);
  }

  render() {

    return (

      <XForm submit={async (values: any) => {
        console.log(`the form is just submitted with values: ${stringify(values)}`)
      }}>

        <XFormItem label="Terms" required={true} showLabel={true}>
          <XTextInput/>
        </XFormItem>

        <XFormItem label="Conditions" required={true} showLabel={true}>
          <XTextInput placeholder="Conditions..."/>
        </XFormItem>

        <XFormItem label="Extras" required={true} showLabel={true}>
          <XTextInput placeholder="Extras..."/>
        </XFormItem>

        <XFormItem>
          <XButton
            style={{marginLeft: 25, marginRight: 25, marginTop: 13}}
            content="Search"
            htmlType="submit"
            size={XButtonSize.large}
          />
        </XFormItem>

      </XForm>

    )
  }
}

FormScreen.navigationOptions = {
  title: 'Form',
};

export default FormScreen;



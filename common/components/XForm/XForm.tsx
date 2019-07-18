import React, {Component} from 'react';
import {IProps, IState, XFormContext} from './';
import {createForm} from 'rc-form';
import {Form} from 'native-base';
import {isNull, stringify} from 'Common/utils';


class XForm extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  handleSubmit = (submit: any, form: any) => (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any[]) => {
      if (!isNull(err)) {
        console.log(`Form Error: ${stringify(err)}`);
      } else if (!isNull(submit)) {
        // console.log("submitting values...", values);
        submit(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldValue, setFieldsValue,
      getFieldsError, getFieldError, isFieldTouched, setFields
    } = this.props.form;
    const {children, submit, form} = this.props;

    return (
      <Form>
        <XFormContext.Provider value={{
          getFieldDecorator, getFieldValue, setFieldsValue,
          getFieldsError, getFieldError, isFieldTouched, setFields,
          onSubmit: this.handleSubmit(submit, form)
        }}>
          {children}
        </XFormContext.Provider>
      </Form>
    );
  }

}

export default createForm()(XForm);

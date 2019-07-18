import React, {Component} from 'react';
import {IProps, IState, XFormContext} from './';
import {isNull} from 'Common/utils';
import {Form} from 'antd';


class XDynamicForm extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
  }

  handleSubmit = (e: any) => {
    const {submit, form} = this.props;
    e.preventDefault();
    form.validateFields((err: any, values: any[]) => {
      if (!isNull(err)) {
        console.error(`Form Error: ${err}`);
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
    const {children} = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <XFormContext.Provider value={{
          getFieldDecorator, getFieldValue, setFieldsValue,
          getFieldsError, getFieldError, isFieldTouched, setFields
        }}>
          {children}
        </XFormContext.Provider>
      </Form>
    );
  }

}

const XForm = Form.create({name: 'dynamic_form_item'})(XDynamicForm);

export default XForm;

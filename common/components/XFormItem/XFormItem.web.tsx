import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import {
  defaults,
  isArrayNullEmpty,
  isNull, isTrue,
  objectHasField,
  stringify, uniqueID,
} from 'Common/utils';
import XCheckbox from "X/XCheckbox";
import {XFormContext} from "X/XForm";
import XButton from "X/XButton";


const formItemWrapper: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  marginLeft: 10,
  marginRight: 10,
}

const inputWrapper = {};
const errorinfo: React.CSSProperties = {
  marginTop: 10,
}
const errorinfoText: React.CSSProperties = {
  color: 'red',
}


class XFormItem extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      uniqueID: uniqueID()
    };
  }

  componentDidMount() {

  }

  hasErrors = (fieldsError: any): boolean => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  isChildXCheckbox = (): boolean => {
    const childrenArray = React.Children.toArray(this.props.children);

    if (isArrayNullEmpty(childrenArray)) {
      return false;
    } else if (objectHasField(childrenArray[0], 'type')) {
      // @ts-ignore
      return childrenArray[0].type === XCheckbox;
    }
    return false;
  }


  /**
   * todo.. extract this method.. it can be used also in other places
   * @param children
   */
  extractProperties = (children: any[], getFieldsError: any): { value: any, adjustedChildren: any[] } => {
    let adjustedChildren: any[] = [];
    let _value: any = null;
    if (isArrayNullEmpty(children)) {
      return {value: null, adjustedChildren: []};
    }
    for (let index = 0; index < children.length; index++) {
      const child = children[index];

      /**
       * checkbox
       */
      if (child.type === XCheckbox) {
        const {checked, ...childProps} = child.props;
        let adjustedChild;
        if (isNull(checked)) {
          adjustedChild = child;
        } else {
          _value = checked;
          adjustedChild = React.createElement(child.type, childProps);
        }
        adjustedChildren.push(adjustedChild);
      }
      /**
       * button
       */
      else if (child.type === XButton) {
        const {...childProps} = child.props;
        const disabled = this.hasErrors(getFieldsError());
        childProps['disabled'] = disabled;
        let adjustedChild = React.createElement(child.type, childProps);
        adjustedChildren.push(adjustedChild);
      }
      /**
       * others
       */
      else {
        const {value, ...childProps} = child.props;
        let adjustedChild;
        if (isNull(value)) {
          adjustedChild = child;
        } else {
          _value = value;
          adjustedChild = React.createElement(child.type, childProps);
        }
        adjustedChildren.push(adjustedChild);
      }
    }
    return {adjustedChildren: adjustedChildren, value: _value};
  }

  /**
   * this method is used to proxy the onChange method that is provided by the respective usages
   * this is necessary to keep the antd form data store in sync with the user data
   * @param onChange
   * @param setFieldsValue
   * @param fieldName
   * @usagge like in
   *                      childProps['onChange'] = this._onChange(onChange, setFieldsValue, fieldName);
   */
  _onChange = (onChange: any, setFieldsValue: any, fieldName: string) => (eventValue: any, option: React.ReactElement<any> | React.ReactElement<any>[]): any => {
    onChange(eventValue, option);
    let _value;
    if (isNull(eventValue)) {
      _value = null;
    } else if (!isNull(eventValue.target)) {
      _value = eventValue.target.value;
    } else {
      _value = eventValue;
    }
    console.log(`....onChange: ${onChange}, setFieldsValue: ${setFieldsValue}, fieldName: ${fieldName}, value: ${stringify(_value)}`);
    const _fieldValue: any = {};
    _fieldValue[fieldName] = _value;
    setFieldsValue(_fieldValue);
  }


  getError = (getFieldsError: any, fieldId: string) => {
    const errors = getFieldsError();
    const error = errors[fieldId];
    // console.log(`errors: ${stringify(errors)}, fieldId: ${fieldId}, error: ${error}`)
    if (!isNull(error)) {
      return error.map((info: any) => {
        return (
          <div style={errorinfoText} key={info}>
            {info}
          </div>
        );
      });
    }
    return null;
  }

  render() {

    const {
      label, required,
      validateTrigger, rules, children, type, showLabel
    } = this.props;

    return <XFormContext.Consumer>
      {({
          getFieldDecorator, getFieldError, getFieldsError
        }: any) => {

        const _uniqueId = this.state.uniqueID;
        const _label = defaults(label, _uniqueId);
        const _id = `${_label.replace(new RegExp(" ", 'g'), "_")}` + `${_uniqueId}`;
        const _required = defaults(required, false);
        const _type = defaults(type, 'string');

        const _rules = [defaults(rules, {required: _required, message: `${_label} is required`, type: _type})];
        const _validateTrigger = defaults(validateTrigger, ['onChange', 'onBlur']);

        const {value, adjustedChildren} = this.extractProperties(React.Children.toArray(children), getFieldsError);
        const _child = adjustedChildren[0];
        const _isButton = _child.type === XButton;

        /**
         * initialize and return the Item, the decorator and the given element
         */

        return <Fragment>

          {/*if the wrapped component is a button*/}
          {_isButton && _child}

          {/*for all the other components*/}
          {!_isButton &&

          <div style={formItemWrapper}>

            {isTrue(showLabel) &&
            _label
            }

            <div style={inputWrapper}>
              {
                getFieldDecorator(_id, {
                  validateFirst: true,
                  rules: _rules,
                  initialValue: value,
                  valuePropName: this.isChildXCheckbox() ? 'checked' : 'value',
                  validateTrigger: _validateTrigger
                })(
                  _child
                )
              }
              <div style={errorinfo}>{this.getError(getFieldsError, _id)}</div>
            </div>
          </div>
          }

        </Fragment>

      }}
    </XFormContext.Consumer>;
  }
}

export default XFormItem;

import React, {Component, Fragment} from 'react';
import {IProps, IState} from './';
import {
  defaults,
  isArrayNullEmpty,
  isNull,
  objectHasField,
  uniqueID,
  isTrue
} from 'Common/utils';
import XCheckbox from "X/XCheckbox";
import XText from "X/XText";
import XButton from "X/XButton";
import {XFormContext} from "X/XForm";
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  formItemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  inputWrapper: {

  },
  errorinfo: {
    marginTop: 10,
  },
  errorinfoText: {
    color: 'red',
  },
});


class XFormItem extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      uniqueID: uniqueID(2)
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


  extractProperties = (children: any[], getFieldsError: any, onSubmit: any): { value: any, adjustedChildren: any[] } => {
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
        const {htmlType, ...childProps} = child.props;
        const disabled = this.hasErrors(getFieldsError());
        childProps['disabled'] = disabled;
        if (!isNull(onSubmit) && !isNull(htmlType) && htmlType === 'submit') {
          childProps['onPress'] = onSubmit;
        }
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


  getError = (getFieldsError: any, fieldId: string) => {
    const errors = getFieldsError();
    const error = errors[fieldId];
    // console.log(`errors: ${stringify(errors)}, fieldId: ${fieldId}, error: ${error}`)
    if (!isNull(error)) {
      return error.map(info => {
        return (
          <Text style={styles.errorinfoText} key={info}>
            {info}
          </Text>
        );
      });
    }
    return null;
  };


  render() {

    const {
      label, required,
      validateTrigger, rules, children, type, showLabel
    } = this.props;

    return <XFormContext.Consumer>
      {({
          getFieldDecorator, getFieldError, getFieldsError,
          isFieldTouched, onSubmit
        }: any) => {

        const _uniqueId = this.state.uniqueID;
        const _label = defaults(label, _uniqueId);
        const _id = `${_label.replace(new RegExp(" ", 'g'), "_")}` + `${_uniqueId}`;
        const _required = defaults(required, false);
        const _type = defaults(type, 'string');

        const _rules = [defaults(rules, {required: _required, message: `${_label} is required`, type: _type})];
        const _validateTrigger = defaults(validateTrigger, ['onChange', 'onBlur']);

        const {value, adjustedChildren} = this.extractProperties(React.Children.toArray(children), getFieldsError, onSubmit);
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

          <View style={styles.formItemWrapper}>

            {isTrue(showLabel) &&
            <XText>{_label}</XText>
            }

            <View style={styles.inputWrapper}>
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
              <View style={styles.errorinfo}>{this.getError(getFieldsError, _id)}</View>
            </View>
          </View>
          }

        </Fragment>

      }}
    </XFormContext.Consumer>;
  }
}

export default XFormItem;

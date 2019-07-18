import React, {Component} from 'react';
import {IProps, IState, OptionType} from './';
import {Select} from 'antd';
import {isArray, stringify, isNull, isArrayNullEmpty} from 'Common/utils';


class XSelect extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      _options: {}
    };
  }

  componentDidMount() {
    const {options} = this.props;
    const _options = this.internalOptions(options);
    this.setState({
      _options: _options
    });
  }


  internalOptions = (options: OptionType[]): any => {
    let _options: any = {};
    for (const optionType of options) {
      _options[optionType.value] = optionType;
    }
    return _options
  }


  _value = (optionTypes: any) => {
    // console.log(`optionTypes: ${stringify(optionTypes, ',')}`);
    let _returnValue = null;
    if (!isNull(optionTypes) && isArray(optionTypes) && !isArrayNullEmpty(optionTypes)) {
      _returnValue = optionTypes.map((optionType: OptionType) => (optionType.value));
    } else {
      _returnValue = optionTypes.value;
    }
    //console.log(`_returnValue: ${stringify(_returnValue)}`);
    return _returnValue;
  }

  _onChange = (value: any, option: React.ReactElement<any> | React.ReactElement<any>[]): void => {
    const {onChange} = this.props;

    if (isNull(onChange)) {
      return;
    }
    let _onChangeValue = null;
    if (isArrayNullEmpty(value)) {
      _onChangeValue = null;
    } else if (isArray(value)) {
      _onChangeValue = value.map((_value: any) => this.state._options[_value])
    } else {
      _onChangeValue = this.state._options[value]
    }

    //console.log(`.........._onChangeValue: ${_onChangeValue}`)

    onChange(_onChangeValue);
  }

  render() {

    const {style, isMulti, value, options, placeholder} = this.props;

    const Option = Select.Option;

    const _options = options.map(({label, value}, index) => {
      return <Option value={value} key={index}>{label}</Option>
    })


    return (
      <Select
        showSearch
        mode={isMulti ? "multiple" : "default"}
        style={style}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={this._onChange}
        {...(!isNull(value) && {value: this._value(value)})}

        /*        onFocus={handleFocus}
                onBlur={handleBlur}*/
        /*        filterOption={(input, option) => {
                  console.log("option", option);
                  // return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  return true;
                }}*/
      >
        {_options}


      </Select>
    );
  }
}

export default XSelect;

import React, {Component, Fragment} from 'react';
import {IProps, IState, OptionType} from './';
import {asArray, isArray, isArrayNullEmpty, isNull, isTrue, stringify} from "Common/utils";
import RCMultiSelect from "./RCMultiSelect";
import {View} from "react-native";


class XSelect extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const {options, optionsKeyValue} = this.internalOptions(this.props.options);
    this.state = {
      _options: options,
      _optionsKeyValue: optionsKeyValue,
    };
  }

  componentDidMount() {
  }

  //todo, consider using a different select where this proxying is not necessary
  _onChange = (value: any) => {
    const {onChange, isMulti} = this.props;
    // console.log(`onChange value: ${stringify(value)}`)

    let _value = value;
    if (!isArrayNullEmpty(value)) {
      if (isTrue(isMulti)) {
        _value = value.map((entry, index) => {
          const name = this.state._optionsKeyValue[entry]
          return {value: entry, label: `${name}`};
        })
      } else {
        const name = this.state._optionsKeyValue[value]
        _value = {value: asArray(value)[0], label: `${name}`};
      }
    }
    // console.log(`onChange _value: ${stringify(_value)}`)
    onChange(_value);
  }

  internalOptions = (options: OptionType[]) => {
    const optionsKeyValue = {};
    for (const optionType of options) {
      if (isNull(optionType.name) && !isNull(optionType.label)) {
        optionType.name = optionType.label;
      }
      optionsKeyValue[optionType.value] = optionType.name;
    }
    return {options, optionsKeyValue}
  }


  render() {
    const {style, isMulti, value, onChange, placeholder} = this.props;
    const {_options} = this.state;

    const _style = Object.assign({marginTop: 20}, style);

    let _value = null;
    if (!isNull(value)) {
      if (isTrue(isMulti)) {
        _value = value.map((entry, index) => {
          return entry.value;
        })
      } else {
        _value = [value.value];
      }
    }

    // console.log(`_value: ${stringify(value)}`);

    return (
      <View style={_style}>
        <RCMultiSelect
          hideTags={false}
          single={!isMulti}
          items={_options}
          uniqueKey="value" //id
          onSelectedItemsChange={this._onChange}
          selectedItems={_value}
          selectText={placeholder}
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="red"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          submitButtonColor="#CCC"
          submitButtonText="Ok"
        />
      </View>
    );
  }
}

export default XSelect;


import React, {Component} from 'react';
import {View} from 'react-native';
import RCMultiSelect from 'X/XSelect/RCMultiSelect';
import {IProps} from "./LoginScreen";

class MultiSelect extends Component {


  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedItems: [],
      items: this.newItems(),
    };
  }

  newItems = () => {
    return [{
      id: '92iijs7yta',
      name: 'Ondo',
    }, {
      id: 'a0s0a8ssbsd',
      name: 'Ogun',
    }, {
      id: '16hbajsabsd',
      name: 'Calabar',
    }, {
      id: 'nahs75a5sg',
      name: 'Lagos',
    }, {
      id: '667atsas',
      name: 'Maiduguri',
    }, {
      id: 'hsyasajs',
      name: 'Anambra',
    }, {
      id: 'djsjudksjd',
      name: 'Benue',
    }, {
      id: 'sdhyaysdj',
      name: 'Kaduna',
    }, {
      id: 'suudydjsjd',
      name: 'Abuja',
    }];
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    const {items, selectedItems} = this.state;
    return (
      <View style={{flex: 1}}>
        <RCMultiSelect
          hideTags={false}
          single={true}
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />

      </View>
    );
  }
}


MultiSelect.navigationOptions = {
  title: 'Multi Select',
}

export default MultiSelect;

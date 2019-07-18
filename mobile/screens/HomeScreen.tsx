import React, {Component, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import XButton, {XButtonTheme, XButtonSize} from 'X/XButton'
import XTextInput from 'X/XTextInput';
import XCheckbox from "X/XCheckbox";
import XCollapse from "X/XCollapse";
import XText from "X/XText";
import XGroup from "X/XGroup";
import XSelect, {OptionType} from "X/XSelect";
import XTabs from "X/XTabs";
import XImage, {ICONS} from "X/XImage";
import XTextIcon from "X/XTextIcon";
import XBR from "X/XBR";
import XBadge, {XBadgeTheme} from "X/XBadge";


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

const stylesMultiOptions = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  container: {
    marginTop: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  switch: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})

export interface IProps {
}

export interface IState {
  isOpen: boolean;
  options: OptionType[];
  selectedOption: OptionType;
  multiSelectedOptions: OptionType[];
  isLoading: boolan;
  items: string[];
}


class HomeScreen extends Component<IProps & IState> {

  constructor(props: IProps) {
    super(props);

    const selectOptions = [];
    for (let i = 1; i <= 25; i++) {
      let selectOption = {};
      selectOption.label = `name ${i}`;
      selectOption.value = `value ${i}`;
      selectOptions.push(selectOption);
    }

    this.state = {
      isOpen: false,
      options: selectOptions
    };
  }

  toggleCollapse = () => {
    console.log("Toggle collapse is triggered...");
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateSelected = (currentSelectedOptions: OptionType): void => {
    this.setState({
      selectedOption: currentSelectedOptions
    })
  }

  updateMultiSelected = (currentSelectedOptions: OptionType[]): void => {
    this.setState({
      multiSelectedOptions: currentSelectedOptions
    })
  }


  render() {

    const {isOpen, options, selectedOption, multiSelectedOptions} = this.state;

    return (
      <XGroup centered={true} style={{backgroundColor: "#FEF6FF"}}>

        <XText>One line break</XText>
        <XBR/>
        <XText>Two line break</XText>
        <XBR count={2}/>
        <XText>End of line break</XText>

        <XBadge
          style={{width:150}}
          m-style={{width:150, backgroundColor: 'black', height:60}}
          w-pill={true}
          w-theme={XBadgeTheme.dark}
          m-contentStyle={{color:'yellow'}}
          content="A new Badge"
          icon={ICONS.BabyBottle_cmp}
          iconStyle={{color: "red", height:40}}
        />


        <XImage icon={ICONS.I_CARET_TOP} style={{color: "red", width: 15}}/>

        <XImage icon={ICONS.Logo_img} style={{color: "red", width: 200}}/>

        <XImage icon={ICONS.BabyBottle_cmp} style={{color: "red"}}/>

        <XTextIcon text="defined svg" icon={ICONS.I_SEARCH} styleIcon={{color: "red"}}/>

        <XTextIcon text="svg image" icon={ICONS.AddCard_svg} styleIcon={{color: "red"}}/>

        <XTextIcon text="Component image" icon={ICONS.AddCard_cmp} styleIcon={{color: "red"}}/>

        <XTextIcon text="Logo" icon={ICONS.Logo_img} styleIcon={{color: "red", size: 32}}/>

        <XButton
          imageName="logo2"
          transparent={true}
          theme={XButtonTheme.danger}
          size={XButtonSize.large}
          content="this button has some xText"
        />
        <XText>Welcome to the home screen 4</XText>
        <XTextInput
          placeHolder="XTextInput dummy placeholder"
          onChange={() => console.log("XTextInput... changed")}
        />

        <XText style={{paddingTop: 40}}>This is a checkbox:</XText>
        <XCheckbox
          style={{paddingTop: 20}}
          checked={true}
          onChange={() => console.log("XCheckbox... changed")}
        />

        <XCollapse
          isOpen={isOpen}
        >
          <XButton style={{marginTop: 40}}
                   theme={XButtonTheme.info}
                   size={XButtonSize.small}
                   onPress={this.toggleCollapse}
                   content="Collapse content"
          />
          <XText
            style={{backgroundColor: 'red', padding: 20}}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </XText>
        </XCollapse>

        <XSelect
          style={stylesMultiOptions}
          isMulti={true}
          value={multiSelectedOptions}
          onChange={this.updateMultiSelected}
          options={options}
          placeholder="select multi..."
        />

        <XSelect
          style={styles}
          isMulti={false}
          value={selectedOption}
          onChange={this.updateSelected}
          options={options}
          placeholder="select One..."
        />

        <XTabs
          activeTab={0}
          tabStyle={{backgroundColor: "#F6EEEE", marginBottom: 3}}
          contentStyle={{borderColor: "black", backgroundColor: "#F6EEEE", padding: 5}}
        >
          <XTextIcon text="Entries" icon={ICONS.I_SEARCH} styleIcon={{color: "red"}}/>
          <XText>
            This is the content of the first tab!
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            This is the content of the first tab!
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            This is the content of the first tab!
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </XText>
          <XTextIcon text="Related Entries" icon={ICONS.FACEBOOK} styleIcon={{color: "orange"}}/>
          <XText>
            This is the content of the second tab!
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </XText>
          <XTextIcon text="Third Tab with very long title" icon={ICONS.BOLD} styleIcon={{color: "green"}}/>
          <XText>
            This is the content of the third tab!
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </XText>
        </XTabs>


      </XGroup>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;

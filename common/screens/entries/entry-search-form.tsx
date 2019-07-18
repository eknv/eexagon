import React, {Fragment} from 'react';
import assert from 'assert';
import {compose, withProps} from 'recompose';
import {withNamespaces} from 'react-i18next';
import {
  Attribute, AttributeValue, EntryRelationType
} from 'Common/model';
import {
  asArray,
  isNull,
  trimLowerCase,
  isNullEmptyObject,
  isNullEmpty,
  isArrayNullEmpty,
  firstArrayElement, stringify
} from 'Common/utils';
import {sortBy} from 'lodash-es';
import CONSTANTS from 'Common/constants';
import XTextInput from 'X/XTextInput';
import XSelect, {OptionType} from "X/XSelect";
import XFormItem from "X/XFormItem";
import XCheckbox from "X/XCheckbox";


interface IProps {
  level: number;
  attributes: Map<string, Attribute>;
  relationTypes: EntryRelationType[];
  booleanOptions: Map<string, Map<string, OptionType>>;
  termChanged: (level: number) => (event: React.FormEvent<HTMLInputElement>) => void;
  setSelectedOptions: (level: number, selectedOptions: Map<string, OptionType | OptionType[]>) => void;
  t?: (term: string) => string;
}

interface IState {
  selectedOptions: Map<string, OptionType | OptionType[]>;
  term: string;
}

class EntrySearchForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOptions: this.getDefaultOptions(),
      term: ''
    };
  }

  componentDidMount() {
    const {selectedOptions} = this.state;
    const {level, setSelectedOptions} = this.props;
    setSelectedOptions(level, selectedOptions);
  }

  displayForSearch = (attribute: Attribute, selectedOptions: Map<string, OptionType | OptionType[]>, attributesMap: Map<string, Attribute>): boolean => {

    if (isNullEmpty(attribute.displaySearchCondition) || trimLowerCase(attribute.displaySearchCondition) === 'true') {
      return true;
    }

    let conditionMatched: boolean = false;

    let conditions = null;
    try {
      conditions = JSON.parse(attribute.displaySearchCondition);
    } catch (error) {
      // TODO: display this in the debug mode
      // console.log("not possible to parse: ", attribute.displaySearchCondition);
    }

    if (!isNullEmptyObject(conditions)) {
      mainLoop:
        // iterate over the conditions like in {"Type":["Word"]}
        for (let condition in conditions) {
          if (conditions.hasOwnProperty(condition)) {
            let conditionValues = conditions[condition];
            let {id: conditionAttributeId} = attributesMap.get(condition);
            // iterate over the condition-values, in this case ["Word"]
            for (let conditionValue of conditionValues) {
              let condition_selectedOptions = selectedOptions.get(conditionAttributeId);
              // if for the condition's attribute, something is selected
              if (!isArrayNullEmpty(condition_selectedOptions)) {
                for (let condition_selectedOption of asArray(condition_selectedOptions)) {
                  // condition_selectedOption has a format like {label: "Word", value: "cjrhpf12400001o96daeok4k0"}
                  if (condition_selectedOption && condition_selectedOption.label && condition_selectedOption.label === `${conditionValue}`) {
                    conditionMatched = true;
                    break mainLoop;
                  }
                }
              }
            }
          }
        }
    }

    return conditionMatched;
  }


  getDefaultOptions = () => {

    const selectedOptions = new Map();
    const {attributes, level} = this.props;

    for (let attribute of Array.from(attributes.values())) {
      let defaultOptionTypes: OptionType[] = selectedOptions.get(attribute.id) as OptionType[];
      if (isNull(defaultOptionTypes)) {
        defaultOptionTypes = [];
        selectedOptions.set(attribute.id, defaultOptionTypes);
      }

      for (let attributeValue of attribute.values) {
        if (!isNull(attributeValue.isDefault)) {
          if (trimLowerCase(attributeValue.isDefault) === "true") {
            defaultOptionTypes.push({label: attributeValue.value, value: attributeValue.id});
          } else {
            let _isDefault;
            try {
              _isDefault = JSON.parse(attributeValue.isDefault);
            } catch (error) {
              // TODO: display this in the debug mode
              // console.log("not possible to parse: ", attribute.displaySearchCondition);
            }
            if (!isNullEmptyObject(_isDefault) && trimLowerCase(_isDefault[`${level}`]) === "true") {
              defaultOptionTypes.push({label: attributeValue.value, value: attributeValue.id});
            }
          }
        }
      }
    }
    return selectedOptions;
  }


  optionTypes = (attributeValues: AttributeValue[]): OptionType[] => {
    let optionTypes: OptionType[] = [];
    for (let attributeValue of attributeValues) {
      let optionType: OptionType = {label: attributeValue.value, value: attributeValue.id};
      optionTypes.push(optionType);
    }
    return optionTypes;
  }

  displayAttributeForSearch = (attribute: Attribute, selectedOptions: Map<string, OptionType | OptionType[]>, attributesMap: Map<string, Attribute>): boolean => {
    let _displayForSearch = this.displayForSearch(attribute, selectedOptions, this.props.attributes);
    // if an attribute is not being displayed, the already selected values should not be considered any longer
    if (!_displayForSearch) {
      selectedOptions.delete(attribute.id)
    }
    return _displayForSearch;
  }

  displayAsOption = (attribute: Attribute): boolean => {
    return this.displayAttributeForSearch(attribute, this.state.selectedOptions, this.props.attributes) &&
      (attribute.type === 'SELECT' || attribute.type === 'MULTISELECT');
  }

  displayAsBoolean = (attribute: Attribute): boolean => {
    return this.displayAttributeForSearch(attribute, this.state.selectedOptions, this.props.attributes) &&
      (attribute.type === 'BOOLEAN');
  }

  hasAttributeMultiOptions = (attribute: Attribute): boolean => {
    if (attribute.type === 'MULTISELECT') {
      return true;
    } else if (attribute.type === 'SELECT') {
      return false;
    } else {
      throw new Error("#E The attribute type " + attribute.type + "is not supported");
    }
  }

  updateTerm = (event: React.FormEvent<HTMLInputElement>): void => {
    const {level, termChanged} = this.props;

    this.setState({
      term: event.currentTarget.value
    });

    termChanged(level)(event);
  }

  updateSelectedOptions = (attribute: Attribute): (currentSelectedOptions: OptionType | OptionType[]) => void => {
    return (newSelectedOptions: OptionType | OptionType[]) => {

      let {selectedOptions} = this.state;
      let {setSelectedOptions, level} = this.props;

      assert(attribute && attribute.id, "Attribute should be provided!");

      if (attribute.type === 'MULTISELECT') {
        let attributeSelectedOptions: OptionType[] = [];
        newSelectedOptions = asArray(newSelectedOptions);
        for (let selectedOption of newSelectedOptions) {
          attributeSelectedOptions.push(selectedOption);
        }
        selectedOptions.set(attribute.id, attributeSelectedOptions);
      } else if (attribute.type === 'SELECT') {
        newSelectedOptions = asArray(newSelectedOptions);
        if (newSelectedOptions.length > 0) {
          selectedOptions.set(attribute.id, newSelectedOptions[0]);
        } else {
          selectedOptions.delete(attribute.id);
        }

      } else {
        throw new Error("#E The attribute type " + attribute.type + "is not supported");
      }

      this.setState({selectedOptions})
      setSelectedOptions(level, selectedOptions);

    }
  }

  updateSelectedOptionsCheckbox = (attribute: Attribute) => (): void => {

    let {selectedOptions} = this.state;
    let {setSelectedOptions, level, booleanOptions} = this.props;

    if (attribute.type === 'BOOLEAN') {
      let attributeBooleanValue = selectedOptions.get(attribute.id) as OptionType;
      let newAttributeBooleanValue: OptionType;
      if (attributeBooleanValue === null || attributeBooleanValue === undefined || attributeBooleanValue.label === 'false') {
        newAttributeBooleanValue = booleanOptions.get(attribute.id).get("true");
      } else {
        newAttributeBooleanValue = booleanOptions.get(attribute.id).get("false");
      }
      selectedOptions.set(attribute.id, newAttributeBooleanValue);
    } else {
      throw new Error("#E The attribute type " + attribute.type + " is not supported");
    }

    this.setState({selectedOptions})
    setSelectedOptions(level, selectedOptions);

  }

  retrieveSelectedOptions = (attribute: Attribute): OptionType[] | OptionType | boolean => {

    let {selectedOptions} = this.state;
    if (attribute.type === 'MULTISELECT') {
      let attributeSelectedOptions = selectedOptions.get(attribute.id) as OptionType[];
      if (isNull(attributeSelectedOptions)) {
        attributeSelectedOptions = [];
      }
      return attributeSelectedOptions;
    } else if (attribute.type === 'SELECT') {
      return firstArrayElement(selectedOptions.get(attribute.id));
    } else if (attribute.type === 'BOOLEAN') {
      let booleanOption = selectedOptions.get(attribute.id) as OptionType;
      return (booleanOption === null || booleanOption === undefined || booleanOption.label === "false") ? false : true;
    } else {
      throw new Error("#E The attribute type " + attribute.type + " is not supported");
    }
  }

  render() {

    /**
     * TODO
     * do not update the parent after each change
     * the button should let the form doing the validation, get the new values and then perform the search
     **/

    const self = this;

    let {attributes}: IProps = this.props;

    return <Fragment>

      <XFormItem label="Term" required={false} showLabel={true}>
        <XTextInput placeholder="Search term..." onChange={this.updateTerm} value={this.state.term}/>
      </XFormItem>

      {sortBy(Array.from(attributes.values()), "id").map(function (attribute: Attribute | any, index: number, array: any) {
        return <Fragment key={index}>

          {self.displayAsOption(attribute) &&
          <XFormItem
            type={self.hasAttributeMultiOptions(attribute) ? "array" : "object"}
            label={attribute.title}
            showLabel={true}
          >
            <XSelect
              isMulti={self.hasAttributeMultiOptions(attribute)}
              className="basic-multi-select"
              value={self.retrieveSelectedOptions(attribute) as OptionType | OptionType[]}
              onChange={self.updateSelectedOptions(attribute)}
              options={self.optionTypes(attribute.values)}
            />
          </XFormItem>
          }

          {self.displayAsBoolean(attribute) &&
          <XFormItem
            type="boolean"
            label={attribute.title}
            showLabel={true}
          >
            <XCheckbox
              onChange={self.updateSelectedOptionsCheckbox(attribute)}
              checked={self.retrieveSelectedOptions(attribute) as boolean}/>
          </XFormItem>
          }

        </Fragment>;
      })}

    </Fragment>;
  }
}

const getOrderByAsAttribute = (t: (term: string) => string): Attribute => {
  return {
    id: CONSTANTS.ID_ORDER_BY,
    title: 'Order By',
    description: 'Order By',
    type: 'SELECT',
    mandatoryCondition: null,
    displaySearchCondition: 'true',
    scope: null,
    values: [
      {
        id: 'content_ASC',
        attribute: null,
        value: t('enum.order-by-content-asc')
      },
      {
        id: 'content_DESC',
        attribute: null,
        value: t('enum.order-by-content-desc')
      },
      {
        id: 'createdAt_ASC',
        attribute: null,
        value: t('enum.order-by-creation-time-asc')
      },
      {
        id: 'createdAt_DESC',
        attribute: null,
        value: t('enum.order-by-creation-time-desc')
      },
      {
        id: 'updatedAt_ASC',
        attribute: null,
        value: t('enum.order-by-update-time-asc')
      },
      {
        id: 'updatedAt_DESC',
        attribute: null,
        value: t('enum.order-by-update-time-desc'),
        isDefault: "true"
      }
    ]
  };
}

const addAdditionalAttributes = withProps(({attributes, relationTypes, level, t}: IProps): any => {

  let clonedAttributesMap = new Map(attributes);
  // do not add the relation types to the first level
  if (level === 1) {

    let entriesPerPageAttribute: Attribute = {
      id: CONSTANTS.ID_ENTRIES_PER_PAGE,
      title: 'Entries Per Page',
      description: '',
      type: 'SELECT',
      mandatoryCondition: null,
      displaySearchCondition: 'true',
      scope: null,
      values: [0, 1, 2, 3, 4].map(i => ({
        id: `${(i + 1) * 10}`,
        value: `${(i + 1) * 10}`,
        attribute: null,
        isDefault: (i === 0 ? "true" : null)
      }))
    };

    clonedAttributesMap.set(entriesPerPageAttribute.id, entriesPerPageAttribute);

    let orderByAttribute: Attribute = getOrderByAsAttribute(t);
    clonedAttributesMap.set(orderByAttribute.id, orderByAttribute);

  } else {

    let relationTypeAttribute: Attribute = {
      id: CONSTANTS.ID_RELATION_TYPE,
      title: 'Relation type',
      description: '',
      type: 'MULTISELECT',
      mandatoryCondition: null,
      displaySearchCondition: 'true',
      scope: null,
      values: relationTypes.map((relationType: EntryRelationType) => ({
        id: relationType.id,
        value: relationType.value,
        attribute: null
      }))
    };

    clonedAttributesMap.set(relationTypeAttribute.id, relationTypeAttribute);

    let orderByAttribute: Attribute = getOrderByAsAttribute(t);
    clonedAttributesMap.set(orderByAttribute.id, orderByAttribute);
  }

  // Overwrite the attributes map with the cloned one
  return {attributes: clonedAttributesMap};
});


export default compose<IProps, IProps>(
  withNamespaces(),
  addAdditionalAttributes
)(EntrySearchForm);

import React, {Component, Fragment, Children} from 'react';
import {withNamespaces} from 'react-i18next';
import {withApollo} from 'react-apollo';
import {compose, branch} from 'recompose';

import {assertCondition, assertNotNull} from 'Common/utils-assert';
import {
  Attribute, EntryRelationType
} from 'Common/model';
import {
  isNull, asArray
} from 'Common/utils';
import GetSearchEntriesQuery from 'Common/gql/entries/search-entries';
import updateLocalEntrySearchCriteria from 'Common/gql/entries/update-local-entry-search-criteria';
import loadParameters from 'Common/gql/entries/load-parameters';
import EntryDTO from 'Common/dto/EntryDTO';
import AttributeValueDTO from 'Common/dto/AttributeValueDTO';
import {OptionType} from 'X/XSelect';
import EntrySearchForm from './entry-search-form';
import XButton, {XButtonTheme, XButtonSize} from 'X/XButton';
import XText from 'X/XText';
import XTabs from "X/XTabs";
import {ICONS} from "X/XImage";
import XTextIcon from "X/XTextIcon";
import XForm from "X/XForm";
import XFormItem from "X/XFormItem";
import XGroup from "X/XGroup";
import XBadge, {XBadgeTheme} from "X/XBadge";
import {withRouter} from 'react-router-dom';
import {navigate} from 'Common/navigation';
import {isWeb} from 'Common/utils-env';


export interface EntryCriteria {
  term: string;
  selectedOptions: Map<string, OptionType | OptionType[]>;
}

interface IProps {
  client: any;
  data: any;
  t?: (term: string) => string;
}

interface IState {
  levels: number;
  activeTab: number;
  entryLevelCriteria: Map<number, EntryCriteria>;
  isLoading: boolean;
  paramsSet: boolean;
  booleanOptions: Map<string, Map<string, OptionType>>;
  attributes: Map<string, Attribute>;
  relationTypes: EntryRelationType[];
  skip: number;
  first: number;
}

class EntrySearch extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      levels: 2,
      activeTab: 0,
      entryLevelCriteria: new Map(),
      isLoading: false,
      paramsSet: false,
      booleanOptions: new Map(),
      attributes: new Map(),
      relationTypes: [],
      skip: 0,
      first: 10
    }
  }

  componentDidMount() {

    let attributesQuery = this.props.client.watchQuery({
      query: loadParameters,
      variables: {},
      fetchPolicy: 'cache-and-network'
    });

    attributesQuery.subscribe((result: any) => {

      if (!isNull(result.data)) {

        let data = result.data;

        // setting the attributes
        if (data && !this.state.paramsSet && data.loadParameters) {

          const allAttributes = data.loadParameters.attributes;

          // initialize the entryLevelCriteria map
          for (let level = 1; level <= this.state.levels; level++) {
            this.setSelectedOptions(level, new Map());
          }

          const attributeMap: Map<string, Attribute> = allAttributes.reduce(
            (acc: Map<string, Attribute>, attribute: Attribute) => (acc.set(attribute.title, attribute)), new Map());

          // the following section can also be done after the UI is rendered
          let booleanOptions: Map<string, Map<string, OptionType>> = new Map();
          for (let attribute of allAttributes) {
            if (attribute.type === 'BOOLEAN') {
              let booleanMap: Map<string, OptionType> = new Map();
              for (let attributeValue of attribute.values) {
                assertCondition(attributeValue && attributeValue.value, "Attribute value is missing!");
                let attributeBooleanValue = attributeValue.value.toLowerCase().trim();
                assertCondition(attributeBooleanValue === 'true' || attributeBooleanValue === 'false', "Wrong attribute boolean value '" + attributeBooleanValue + "' is provided, allowed values are: true, false!");
                let optionType: OptionType = {label: attributeBooleanValue, value: attributeValue.id};
                booleanMap.set(attributeBooleanValue, optionType);
              }
              booleanOptions.set(attribute.id, booleanMap);
            }
          }

          // paramsSet signalizes to start rendering the UI
          this.setState({
            paramsSet: true,
            attributes: attributeMap,
            relationTypes: data.loadParameters.entryRelationTypes,
            booleanOptions: booleanOptions
          });

        }

      }
    });

  }

  termChanged = (level: number) => (event: React.FormEvent<HTMLInputElement>): void => {

    let entryCriteria = this.state.entryLevelCriteria.get(level);
    if (isNull(entryCriteria)) {
      entryCriteria = {term: event.currentTarget.value, selectedOptions: new Map()};
    } else {
      entryCriteria.term = event.currentTarget.value;
    }
    this.state.entryLevelCriteria.set(level, entryCriteria);
    this.setState({
      entryLevelCriteria: this.state.entryLevelCriteria
    });
  }


  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return !this.state.paramsSet;
  }

  setSelectedOptions = (level: number, selectedOptions: Map<string, OptionType | OptionType[]>): void => {

    let entryCriteria = this.state.entryLevelCriteria.get(level);
    if (isNull(entryCriteria)) {
      entryCriteria = {term: null, selectedOptions: selectedOptions};
    } else {
      entryCriteria.selectedOptions = selectedOptions;
    }
    this.state.entryLevelCriteria.set(level, entryCriteria);
    this.setState({
      entryLevelCriteria: this.state.entryLevelCriteria
    });
  }


  asEntryDTO = (level: number, entryCriteria: EntryCriteria): EntryDTO => {
    assertNotNull(level, "!Utils.isNull(level)");
    assertNotNull(entryCriteria, "!Utils.isNull(entryCriteria)");

    /**
     * prepare the search criteria out of the form values
     */
    let attributeValueDTOs: AttributeValueDTO[] = [];
    entryCriteria.selectedOptions.forEach((value: OptionType | OptionType[], key: string) => {
      let attributeValue: AttributeValueDTO = {id: key, attributeValueIds: []};
      let values = asArray(value);
      if (values.length > 0) {
        for (let value of values) {
          attributeValue.attributeValueIds.push(value.value);
        }
        attributeValueDTOs.push(attributeValue);
      }
    });

    return {
      level: level,
      term: entryCriteria.term,
      attributeValues: attributeValueDTOs
    } as EntryDTO;

  }

  render() {

    const {paramsSet, activeTab, attributes, relationTypes, booleanOptions, skip, first} = this.state;
    const {client} = this.props;

    return (

      <XGroup style={{paddingBottom: 50}}>
        <XBadge
          style={{padding: 10, margin: 10}}
          m-style={{width: 200, backgroundColor: 'gray', maxHeight: 30, margin: 0}}
          w-pill={true}
          w-theme={XBadgeTheme.info}
          w-contentStyle={{fontSize: 20}}
          m-contentStyle={{color: 'white', fontSize: 20}}
          content="Entry Search"
          icon={ICONS.AddCard_cmp}
          iconStyle={{color: "red", height: 20}}
        />

        {!paramsSet && <XText>Loading</XText>}

        {paramsSet &&
        <XForm submit={async () => {

          const {entryLevelCriteria} = this.state;

          let entryDTOs: EntryDTO[] = [];
          entryLevelCriteria.forEach((entryCriteria: EntryCriteria, level: number) => {
            entryDTOs.push(this.asEntryDTO(level, entryCriteria));
          });

          let queryVariable: { entryDTOs: EntryDTO[], skip: number, first: number } = {
            entryDTOs: entryDTOs,
            skip: skip,
            first: first
          };
          let entriesQuery = client.watchQuery({
            query: GetSearchEntriesQuery(1, new Map()),
            variables: queryVariable,
            fetchPolicy: 'cache-and-network'
          });

          entriesQuery.subscribe((result: any) => {
            if (result.loading) {
              return;
            }

            if (!isNull(result) && !isNull(result.data) && !isNull(result.data.searchEntries)) {
              queryVariable.first = result.data.searchEntries.entriesPerPage;
            }

            navigate(this.props, 'lists', '', null, 'EntryResult', null);

            /**
             * after retrieving the data, update the search criteria in the catch
             * so that the diplay component gets notified and updates itself
             */
            client.mutate({
              mutation: updateLocalEntrySearchCriteria,
              variables: {
                queryVariable: JSON.stringify(queryVariable)
              }
            });
          });

        }}>

          <XTabs
            activeTab={activeTab}
            tabStyle={{marginBottom: 3}}
            contentStyle={{borderColor: "black", backgroundColor: "#f8f1f1", padding: 5}}
          >
            <XTextIcon text="Entries" icon={ICONS.Logo_img} styleIcon={{backgroundColor: "red", size: 15}}/>
            <EntrySearchForm
              level={1}
              attributes={attributes}
              relationTypes={relationTypes}
              booleanOptions={booleanOptions}
              termChanged={this.termChanged}
              setSelectedOptions={this.setSelectedOptions}
            />
            <XTextIcon text="Related Entries" icon={ICONS.AddCard_svg} styleIcon={{color: "red"}}/>
            <EntrySearchForm
              level={2}
              attributes={attributes}
              relationTypes={relationTypes}
              booleanOptions={booleanOptions}
              termChanged={this.termChanged}
              setSelectedOptions={this.setSelectedOptions}
            />
          </XTabs>

          {/*theme={XButtonTheme.dashed}*/}

          <XFormItem>
            <XButton
              style={{marginLeft: 25, marginRight: 25, marginTop: 13}}
              content="Search"
              htmlType="submit"
              size={XButtonSize.large}
            />
          </XFormItem>


        </XForm>
        }

      </XGroup>

    );

  }

}

export default compose(
  branch(isWeb, withRouter),
  withApollo,
  withNamespaces()
)(EntrySearch);

import gql from 'graphql-tag';
import EntryDTO from '../../dto/EntryDTO';
import { isNull, isNullEmpty, isArrayNullEmpty, stringify, isNullEmptyObject } from '../../utils';
import CONSTANTS from '../../constants';


const GetSearchEntriesQuery = (maxLevel: number, relatedEntryCriteriaMap: Map<string, RelatedEntryCriteria>) => {
  const EntryFragment = getEntryFragement(maxLevel, relatedEntryCriteriaMap)
  const query = gql`
  query searchEntries(
    $entryDTOs: [EntryDTO], $skip: Int, $first: Int
  ) {
    searchEntries(
      entryDTOs: $entryDTOs, skip: $skip, first: $first
    )
    {
      entriesPerPage
      count
      entries
        ${EntryFragment}
    }
  }
  `;
  return query;
}


export const getEntryFragement = (maxLevel: number, relatedEntryCriteriaMap: Map<string, RelatedEntryCriteria>): string => {
  let relationPlaceHolder = getNextLevel(maxLevel, maxLevel, relatedEntryCriteriaMap);
  let baseQuery = `
  {
    id
    title
    content
    attributeValues {
      attributeValue {
        id
        value
      }
    }

    ${relationPlaceHolder}
  }
  `;

  return baseQuery;
}

const relatedEntryCriteriaStatement = (relatedEntryCriteria: RelatedEntryCriteria): string => {

  if (isNull(relatedEntryCriteria)) {
    return '';
  }
  if (isNullEmptyObject(relatedEntryCriteria.where) && relatedEntryCriteria.orderBy == null) {
    return '';
  }

  let finalStatement = '';

  // console.log("relatedEntryCriteria.relationTypes: ", relatedEntryCriteria)

  let toStatement = '';
  if (!isNullEmptyObject(relatedEntryCriteria.where) && !isArrayNullEmpty(relatedEntryCriteria.where.AND)) {
    toStatement = `{to:${stringify(relatedEntryCriteria.where)}}`;
  }

  let relationTypeStatement = '';
  if (!isArrayNullEmpty(relatedEntryCriteria.relationTypes)) {
    relationTypeStatement = `{relationType: {id_in:${stringify(relatedEntryCriteria.relationTypes)} }}`;
  }

  if (!isNullEmpty(toStatement) || !isNullEmpty(relationTypeStatement)) {
    const separator = (!isNullEmpty(toStatement) && !isNullEmpty(relationTypeStatement)) ? ', ' : '';
    finalStatement = `where: {AND:[${toStatement}${separator}${relationTypeStatement}]}`;
  }

  if (!isNullEmpty(relatedEntryCriteria.orderBy)) {
    if (!isNullEmpty(finalStatement)) {
      finalStatement = `${finalStatement}, `;
    }
    finalStatement = `${finalStatement} orderBy: ${relatedEntryCriteria.orderBy}`;
  }

  return isNullEmpty(finalStatement) ? finalStatement : `(${finalStatement})`;
}


const getNextLevel = (maxLevel: number, currentLevel: number, relatedEntryCriteriaMap: Map<string, RelatedEntryCriteria>): string => {

  let NextLevel;
  if (currentLevel === 0) {
    return '';
  } else if (currentLevel === 1) {
    NextLevel = '';
  } else {
    NextLevel = getNextLevel(maxLevel, (currentLevel - 1), relatedEntryCriteriaMap);
  }

  let relatedEntryCriteria = relatedEntryCriteriaMap.get(`${maxLevel + 1 - currentLevel}`);

  let relationPlaceHolder = `

    relatedEntriesFrom ${relatedEntryCriteriaStatement(relatedEntryCriteria)}  {
      to {
        id
        title
        content
        attributeValues {
          attributeValue {
            id
            value
          }
        }

        ${NextLevel}

      }
    }

    `;

  return relationPlaceHolder;
}

interface OR {
  OR: any[];
}

interface Where {
  AND: OR[];
}

interface RelatedEntryCriteria {
  where: Where;
  orderBy: string;
  entriesPerPage: number;
  relationTypes: string[];
}


export const relatedEntryCriteria = (entryDTO: EntryDTO): RelatedEntryCriteria => {

  const where: { AND: any[] } = { AND: [] }
  if (!isNullEmpty(entryDTO.term)) {
    // @ts-ignore
    where.AND = [
      {
        OR: [
          {
            title_contains: entryDTO.term
          },
          {
            content_contains: entryDTO.term
          }
        ]
      }
    ]
  }

  let orderBy: string = "updatedAt_DESC";
  let entriesPerPage: number = CONSTANTS.ENTRIES_PER_PAGE;
  let relationTypes: string[] = null;
  /**
   * preparing criteria for the attributes
   */
  for (let attributeValue of entryDTO.attributeValues) {
    /**
     * attribute id 1 is reserved for the order_by
     */
    if (attributeValue.id === CONSTANTS.ID_ORDER_BY) {
      if (!isArrayNullEmpty(attributeValue.attributeValueIds)) {
        orderBy = attributeValue.attributeValueIds[0];
      }
    }
    else if (attributeValue.id === CONSTANTS.ID_ENTRIES_PER_PAGE) {
      if (!isArrayNullEmpty(attributeValue.attributeValueIds)) {
        entriesPerPage = parseInt(attributeValue.attributeValueIds[0], 10);
      }
    }
    else if (attributeValue.id === CONSTANTS.ID_RELATION_TYPE) {
      if (!isArrayNullEmpty(attributeValue.attributeValueIds)) {
        relationTypes = attributeValue.attributeValueIds;
        console.log("_relationTypes: ", relationTypes)
      }
    }
    else {
      let attributeOR: any[] = [];
      for (let attributeValueId of attributeValue.attributeValueIds) {
        let criteria: any = {
          attributeValues_some: {
            attributeValue: {
              id: attributeValueId
            }
          }
        }
        attributeOR.push(criteria)
      }
      where.AND.push({ OR: attributeOR });
    }
  }

  return {
    where,
    orderBy,
    entriesPerPage,
    relationTypes
  }
}


export default GetSearchEntriesQuery;

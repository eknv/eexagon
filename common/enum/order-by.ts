

export interface IOrderBy {
  value: string;
  label: string;
}

export interface IOrderBys {
  [key: string]: IOrderBy;
  CONTENT_ASC: IOrderBy;
  CONTENT_DESC: IOrderBy;
  CREATION_TIME_ASC: IOrderBy;
  CREATION_TIME_DESC: IOrderBy;
  UPDATE_TIME_ASC: IOrderBy;
  UPDATE_TIME_DESC: IOrderBy;
}

/**
 * @deprecated
 */
export const ORDER_BY: IOrderBys = Object.freeze({
  CONTENT_ASC: {
    value: 'CONTENT_ASC',
    label: 'enum.order-by-content-asc',
  },
  CONTENT_DESC: {
    value: 'CONTENT_DESC',
    label: 'enum.order-by-content-desc',
  },
  CREATION_TIME_ASC: {
    value: 'CREATION_TIME_ASC',
    label: 'enum.order-by-creation-time-asc',
  },
  CREATION_TIME_DESC: {
    value: 'CREATION_TIME_DESC',
    label: 'enum.order-by-creation-time-desc',
  },
  UPDATE_TIME_ASC: {
    value: 'UPDATE_TIME_ASC',
    label: 'enum.order-by-update-time-asc',
  },
  UPDATE_TIME_DESC: {
    value: 'UPDATE_TIME_DESC',
    label: 'enum.order-by-update-time-desc',
  },
});

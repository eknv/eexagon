import {Context, getUserId} from './utils';
import CountFragment from 'Common/gql/aggregate';
import {Entry} from 'Common/model';
import {assertIsArrayNotNullEmpty} from 'Common/utils-assert';
import {relatedEntryCriteria, getEntryFragement} from 'Common/gql/entries/search-entries';
import {EntryAttributeFields, EntryRelationTypeFields} from 'Common/gql/entries/load-parameters';
import {stringify} from "Common/utils";

export default {
  feed(parent: any, args: any, ctx: any, info: any) {
    return ctx.db.query.posts(
      {
        where: {
          published: true,
        },
      },
      info
    )
  },

  drafts(parent: any, args: any, ctx: any, info: any) {
    const id = ctx.req.user.id

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.db.query.posts(
      {
        where,
      },
      info
    )
  },

  post(parent: any, {id}: any, ctx: any, info: any) {
    return ctx.db.query.post(
      {
        where: {
          id,
        },
      },
      info
    )
  },

  me(parent: any, args: any, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({id})
  },


  async loadParameters(parent: any, {scope}: any, ctx: any, info: any) {
    // console.log(scope)
    const attributes = await ctx.db.query.attributes(
      {
        where: {
          scope: {
            id: 'cjrhmojfd0000g896pulsqmw6',
          },
        },
      },
      EntryAttributeFields
    )

    const entryRelationTypes = await ctx.db.query.entryRelationTypes(
      {
        where: {
          scope: {
            id: 'cjrhmojfd0000g896pulsqmw6',
          },
        },
      },
      EntryRelationTypeFields
    )

    console.log('attributes: ', attributes);
    console.log('entryRelationTypes: ', entryRelationTypes);
    return {attributes, entryRelationTypes}
  },


  async searchEntries(parent: any, {entryDTOs, skip, first}: any, ctx: any, info: any)
    : Promise<{ entriesPerPage: number, entries: Entry[], count: number }> {

    // console.log(`.............. entryDTOs: ${stringify(entryDTOs)}`);

    assertIsArrayNotNullEmpty(entryDTOs, "assertIsArrayNotNullEmpty(args.entryDTOs)");

    let mainCriteria = relatedEntryCriteria(entryDTOs[0]);

    let relatedEntryCriteriaMap = new Map();
    for (let i = 1; i < entryDTOs.length; i++) {
      let criteria = relatedEntryCriteria(entryDTOs[i]);
      relatedEntryCriteriaMap.set(`${i}`, criteria);
    }

    const serverEntryFragment = getEntryFragement(1, relatedEntryCriteriaMap);
    // console.log("serverEntryFragment: ", serverEntryFragment);

    const entries = await ctx.db.query.entries(
      {
        where: mainCriteria.where,
        orderBy: mainCriteria.orderBy,
        skip: skip,
        first: mainCriteria.entriesPerPage
      },
      serverEntryFragment
    )

    const entriesConnection = await ctx.db.query.entriesConnection(
      {
        orderBy: null,
        where: mainCriteria.where,
        skip: null,
        first: null,
      },
      CountFragment
    )


    // console.log(`...................................................entries: ${stringify(entries)}`)

    return {
      entriesPerPage: mainCriteria.entriesPerPage,
      count: entriesConnection.aggregate.count,
      entries: entries
    }

  }

}

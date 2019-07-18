import { FileUtils } from '.';

describe('@utils/calculate-query-depth', () => {
  it('correctly calculates depth of query', () => {
    const queryStr = `
      query TestQuery {
        tests {
          id
          owner {
            id
            name
            group {
              id
              name
            }
          }
          updatedAt {
            day
            month
            year
          }
        }
      }
    `
    const depth = FileUtils.calculateQueryDepth(queryStr)
    expect(depth).toBe(3)
  })

  it('correctly deals with empty strings', () => {
    const queryStr = ''
    const depth = FileUtils.calculateQueryDepth(queryStr)
    expect(depth).toBe(-1)
  })
})

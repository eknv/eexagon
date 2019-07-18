export const typeDefs = /* GraphQL */ `type AggregateAttribute {
  count: Int!
}

type AggregateAttributeValue {
  count: Int!
}

type AggregateEntry {
  count: Int!
}

type AggregateEntryAttributeValue {
  count: Int!
}

type AggregateEntryRelationType {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateRelatedEntry {
  count: Int!
}

type AggregateScope {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Attribute {
  id: ID!
  title: String!
  description: String
  type: String!
  mandatoryCondition: String
  displaySearchCondition: String
  scope: Scope!
  values(where: AttributeValueWhereInput, orderBy: AttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AttributeValue!]
}

type AttributeConnection {
  pageInfo: PageInfo!
  edges: [AttributeEdge]!
  aggregate: AggregateAttribute!
}

input AttributeCreateInput {
  title: String!
  description: String
  type: String!
  mandatoryCondition: String
  displaySearchCondition: String
  scope: ScopeCreateOneInput!
  values: AttributeValueCreateManyWithoutAttributeInput
}

input AttributeCreateOneWithoutValuesInput {
  create: AttributeCreateWithoutValuesInput
  connect: AttributeWhereUniqueInput
}

input AttributeCreateWithoutValuesInput {
  title: String!
  description: String
  type: String!
  mandatoryCondition: String
  displaySearchCondition: String
  scope: ScopeCreateOneInput!
}

type AttributeEdge {
  node: Attribute!
  cursor: String!
}

enum AttributeOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  type_ASC
  type_DESC
  mandatoryCondition_ASC
  mandatoryCondition_DESC
  displaySearchCondition_ASC
  displaySearchCondition_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AttributePreviousValues {
  id: ID!
  title: String!
  description: String
  type: String!
  mandatoryCondition: String
  displaySearchCondition: String
}

type AttributeSubscriptionPayload {
  mutation: MutationType!
  node: Attribute
  updatedFields: [String!]
  previousValues: AttributePreviousValues
}

input AttributeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AttributeWhereInput
  AND: [AttributeSubscriptionWhereInput!]
  OR: [AttributeSubscriptionWhereInput!]
  NOT: [AttributeSubscriptionWhereInput!]
}

input AttributeUpdateInput {
  title: String
  description: String
  type: String
  mandatoryCondition: String
  displaySearchCondition: String
  scope: ScopeUpdateOneRequiredInput
  values: AttributeValueUpdateManyWithoutAttributeInput
}

input AttributeUpdateManyMutationInput {
  title: String
  description: String
  type: String
  mandatoryCondition: String
  displaySearchCondition: String
}

input AttributeUpdateOneRequiredWithoutValuesInput {
  create: AttributeCreateWithoutValuesInput
  update: AttributeUpdateWithoutValuesDataInput
  upsert: AttributeUpsertWithoutValuesInput
  connect: AttributeWhereUniqueInput
}

input AttributeUpdateWithoutValuesDataInput {
  title: String
  description: String
  type: String
  mandatoryCondition: String
  displaySearchCondition: String
  scope: ScopeUpdateOneRequiredInput
}

input AttributeUpsertWithoutValuesInput {
  update: AttributeUpdateWithoutValuesDataInput!
  create: AttributeCreateWithoutValuesInput!
}

type AttributeValue {
  id: ID!
  attribute: Attribute!
  value: String!
  isDefault: String
}

type AttributeValueConnection {
  pageInfo: PageInfo!
  edges: [AttributeValueEdge]!
  aggregate: AggregateAttributeValue!
}

input AttributeValueCreateInput {
  attribute: AttributeCreateOneWithoutValuesInput!
  value: String!
  isDefault: String
}

input AttributeValueCreateManyWithoutAttributeInput {
  create: [AttributeValueCreateWithoutAttributeInput!]
  connect: [AttributeValueWhereUniqueInput!]
}

input AttributeValueCreateOneInput {
  create: AttributeValueCreateInput
  connect: AttributeValueWhereUniqueInput
}

input AttributeValueCreateWithoutAttributeInput {
  value: String!
  isDefault: String
}

type AttributeValueEdge {
  node: AttributeValue!
  cursor: String!
}

enum AttributeValueOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  isDefault_ASC
  isDefault_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AttributeValuePreviousValues {
  id: ID!
  value: String!
  isDefault: String
}

input AttributeValueScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  isDefault: String
  isDefault_not: String
  isDefault_in: [String!]
  isDefault_not_in: [String!]
  isDefault_lt: String
  isDefault_lte: String
  isDefault_gt: String
  isDefault_gte: String
  isDefault_contains: String
  isDefault_not_contains: String
  isDefault_starts_with: String
  isDefault_not_starts_with: String
  isDefault_ends_with: String
  isDefault_not_ends_with: String
  AND: [AttributeValueScalarWhereInput!]
  OR: [AttributeValueScalarWhereInput!]
  NOT: [AttributeValueScalarWhereInput!]
}

type AttributeValueSubscriptionPayload {
  mutation: MutationType!
  node: AttributeValue
  updatedFields: [String!]
  previousValues: AttributeValuePreviousValues
}

input AttributeValueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AttributeValueWhereInput
  AND: [AttributeValueSubscriptionWhereInput!]
  OR: [AttributeValueSubscriptionWhereInput!]
  NOT: [AttributeValueSubscriptionWhereInput!]
}

input AttributeValueUpdateDataInput {
  attribute: AttributeUpdateOneRequiredWithoutValuesInput
  value: String
  isDefault: String
}

input AttributeValueUpdateInput {
  attribute: AttributeUpdateOneRequiredWithoutValuesInput
  value: String
  isDefault: String
}

input AttributeValueUpdateManyDataInput {
  value: String
  isDefault: String
}

input AttributeValueUpdateManyMutationInput {
  value: String
  isDefault: String
}

input AttributeValueUpdateManyWithoutAttributeInput {
  create: [AttributeValueCreateWithoutAttributeInput!]
  delete: [AttributeValueWhereUniqueInput!]
  connect: [AttributeValueWhereUniqueInput!]
  disconnect: [AttributeValueWhereUniqueInput!]
  update: [AttributeValueUpdateWithWhereUniqueWithoutAttributeInput!]
  upsert: [AttributeValueUpsertWithWhereUniqueWithoutAttributeInput!]
  deleteMany: [AttributeValueScalarWhereInput!]
  updateMany: [AttributeValueUpdateManyWithWhereNestedInput!]
}

input AttributeValueUpdateManyWithWhereNestedInput {
  where: AttributeValueScalarWhereInput!
  data: AttributeValueUpdateManyDataInput!
}

input AttributeValueUpdateOneRequiredInput {
  create: AttributeValueCreateInput
  update: AttributeValueUpdateDataInput
  upsert: AttributeValueUpsertNestedInput
  connect: AttributeValueWhereUniqueInput
}

input AttributeValueUpdateWithoutAttributeDataInput {
  value: String
  isDefault: String
}

input AttributeValueUpdateWithWhereUniqueWithoutAttributeInput {
  where: AttributeValueWhereUniqueInput!
  data: AttributeValueUpdateWithoutAttributeDataInput!
}

input AttributeValueUpsertNestedInput {
  update: AttributeValueUpdateDataInput!
  create: AttributeValueCreateInput!
}

input AttributeValueUpsertWithWhereUniqueWithoutAttributeInput {
  where: AttributeValueWhereUniqueInput!
  update: AttributeValueUpdateWithoutAttributeDataInput!
  create: AttributeValueCreateWithoutAttributeInput!
}

input AttributeValueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  attribute: AttributeWhereInput
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  isDefault: String
  isDefault_not: String
  isDefault_in: [String!]
  isDefault_not_in: [String!]
  isDefault_lt: String
  isDefault_lte: String
  isDefault_gt: String
  isDefault_gte: String
  isDefault_contains: String
  isDefault_not_contains: String
  isDefault_starts_with: String
  isDefault_not_starts_with: String
  isDefault_ends_with: String
  isDefault_not_ends_with: String
  AND: [AttributeValueWhereInput!]
  OR: [AttributeValueWhereInput!]
  NOT: [AttributeValueWhereInput!]
}

input AttributeValueWhereUniqueInput {
  id: ID
}

input AttributeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  mandatoryCondition: String
  mandatoryCondition_not: String
  mandatoryCondition_in: [String!]
  mandatoryCondition_not_in: [String!]
  mandatoryCondition_lt: String
  mandatoryCondition_lte: String
  mandatoryCondition_gt: String
  mandatoryCondition_gte: String
  mandatoryCondition_contains: String
  mandatoryCondition_not_contains: String
  mandatoryCondition_starts_with: String
  mandatoryCondition_not_starts_with: String
  mandatoryCondition_ends_with: String
  mandatoryCondition_not_ends_with: String
  displaySearchCondition: String
  displaySearchCondition_not: String
  displaySearchCondition_in: [String!]
  displaySearchCondition_not_in: [String!]
  displaySearchCondition_lt: String
  displaySearchCondition_lte: String
  displaySearchCondition_gt: String
  displaySearchCondition_gte: String
  displaySearchCondition_contains: String
  displaySearchCondition_not_contains: String
  displaySearchCondition_starts_with: String
  displaySearchCondition_not_starts_with: String
  displaySearchCondition_ends_with: String
  displaySearchCondition_not_ends_with: String
  scope: ScopeWhereInput
  values_every: AttributeValueWhereInput
  values_some: AttributeValueWhereInput
  values_none: AttributeValueWhereInput
  AND: [AttributeWhereInput!]
  OR: [AttributeWhereInput!]
  NOT: [AttributeWhereInput!]
}

input AttributeWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Entry {
  id: ID!
  title: String!
  content: String!
  user: User
  attributeValues(where: EntryAttributeValueWhereInput, orderBy: EntryAttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntryAttributeValue!]
  relatedEntriesFrom(where: RelatedEntryWhereInput, orderBy: RelatedEntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RelatedEntry!]
  relatedEntriesTo(where: RelatedEntryWhereInput, orderBy: RelatedEntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RelatedEntry!]
}

type EntryAttributeValue {
  id: ID!
  entry: Entry!
  attributeValue: AttributeValue!
}

type EntryAttributeValueConnection {
  pageInfo: PageInfo!
  edges: [EntryAttributeValueEdge]!
  aggregate: AggregateEntryAttributeValue!
}

input EntryAttributeValueCreateInput {
  entry: EntryCreateOneWithoutAttributeValuesInput!
  attributeValue: AttributeValueCreateOneInput!
}

input EntryAttributeValueCreateManyWithoutEntryInput {
  create: [EntryAttributeValueCreateWithoutEntryInput!]
  connect: [EntryAttributeValueWhereUniqueInput!]
}

input EntryAttributeValueCreateWithoutEntryInput {
  attributeValue: AttributeValueCreateOneInput!
}

type EntryAttributeValueEdge {
  node: EntryAttributeValue!
  cursor: String!
}

enum EntryAttributeValueOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntryAttributeValuePreviousValues {
  id: ID!
}

input EntryAttributeValueScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [EntryAttributeValueScalarWhereInput!]
  OR: [EntryAttributeValueScalarWhereInput!]
  NOT: [EntryAttributeValueScalarWhereInput!]
}

type EntryAttributeValueSubscriptionPayload {
  mutation: MutationType!
  node: EntryAttributeValue
  updatedFields: [String!]
  previousValues: EntryAttributeValuePreviousValues
}

input EntryAttributeValueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntryAttributeValueWhereInput
  AND: [EntryAttributeValueSubscriptionWhereInput!]
  OR: [EntryAttributeValueSubscriptionWhereInput!]
  NOT: [EntryAttributeValueSubscriptionWhereInput!]
}

input EntryAttributeValueUpdateInput {
  entry: EntryUpdateOneRequiredWithoutAttributeValuesInput
  attributeValue: AttributeValueUpdateOneRequiredInput
}

input EntryAttributeValueUpdateManyWithoutEntryInput {
  create: [EntryAttributeValueCreateWithoutEntryInput!]
  delete: [EntryAttributeValueWhereUniqueInput!]
  connect: [EntryAttributeValueWhereUniqueInput!]
  disconnect: [EntryAttributeValueWhereUniqueInput!]
  update: [EntryAttributeValueUpdateWithWhereUniqueWithoutEntryInput!]
  upsert: [EntryAttributeValueUpsertWithWhereUniqueWithoutEntryInput!]
  deleteMany: [EntryAttributeValueScalarWhereInput!]
}

input EntryAttributeValueUpdateWithoutEntryDataInput {
  attributeValue: AttributeValueUpdateOneRequiredInput
}

input EntryAttributeValueUpdateWithWhereUniqueWithoutEntryInput {
  where: EntryAttributeValueWhereUniqueInput!
  data: EntryAttributeValueUpdateWithoutEntryDataInput!
}

input EntryAttributeValueUpsertWithWhereUniqueWithoutEntryInput {
  where: EntryAttributeValueWhereUniqueInput!
  update: EntryAttributeValueUpdateWithoutEntryDataInput!
  create: EntryAttributeValueCreateWithoutEntryInput!
}

input EntryAttributeValueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  entry: EntryWhereInput
  attributeValue: AttributeValueWhereInput
  AND: [EntryAttributeValueWhereInput!]
  OR: [EntryAttributeValueWhereInput!]
  NOT: [EntryAttributeValueWhereInput!]
}

input EntryAttributeValueWhereUniqueInput {
  id: ID
}

type EntryConnection {
  pageInfo: PageInfo!
  edges: [EntryEdge]!
  aggregate: AggregateEntry!
}

input EntryCreateInput {
  title: String!
  content: String!
  user: UserCreateOneInput
  attributeValues: EntryAttributeValueCreateManyWithoutEntryInput
  relatedEntriesFrom: RelatedEntryCreateManyWithoutFromInput
  relatedEntriesTo: RelatedEntryCreateManyWithoutToInput
}

input EntryCreateOneWithoutAttributeValuesInput {
  create: EntryCreateWithoutAttributeValuesInput
  connect: EntryWhereUniqueInput
}

input EntryCreateOneWithoutRelatedEntriesFromInput {
  create: EntryCreateWithoutRelatedEntriesFromInput
  connect: EntryWhereUniqueInput
}

input EntryCreateOneWithoutRelatedEntriesToInput {
  create: EntryCreateWithoutRelatedEntriesToInput
  connect: EntryWhereUniqueInput
}

input EntryCreateWithoutAttributeValuesInput {
  title: String!
  content: String!
  user: UserCreateOneInput
  relatedEntriesFrom: RelatedEntryCreateManyWithoutFromInput
  relatedEntriesTo: RelatedEntryCreateManyWithoutToInput
}

input EntryCreateWithoutRelatedEntriesFromInput {
  title: String!
  content: String!
  user: UserCreateOneInput
  attributeValues: EntryAttributeValueCreateManyWithoutEntryInput
  relatedEntriesTo: RelatedEntryCreateManyWithoutToInput
}

input EntryCreateWithoutRelatedEntriesToInput {
  title: String!
  content: String!
  user: UserCreateOneInput
  attributeValues: EntryAttributeValueCreateManyWithoutEntryInput
  relatedEntriesFrom: RelatedEntryCreateManyWithoutFromInput
}

type EntryEdge {
  node: Entry!
  cursor: String!
}

enum EntryOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntryPreviousValues {
  id: ID!
  title: String!
  content: String!
}

type EntryRelationType {
  id: ID!
  value: String!
  description: String
  scope: Scope!
}

type EntryRelationTypeConnection {
  pageInfo: PageInfo!
  edges: [EntryRelationTypeEdge]!
  aggregate: AggregateEntryRelationType!
}

input EntryRelationTypeCreateInput {
  value: String!
  description: String
  scope: ScopeCreateOneInput!
}

input EntryRelationTypeCreateOneInput {
  create: EntryRelationTypeCreateInput
  connect: EntryRelationTypeWhereUniqueInput
}

type EntryRelationTypeEdge {
  node: EntryRelationType!
  cursor: String!
}

enum EntryRelationTypeOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntryRelationTypePreviousValues {
  id: ID!
  value: String!
  description: String
}

type EntryRelationTypeSubscriptionPayload {
  mutation: MutationType!
  node: EntryRelationType
  updatedFields: [String!]
  previousValues: EntryRelationTypePreviousValues
}

input EntryRelationTypeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntryRelationTypeWhereInput
  AND: [EntryRelationTypeSubscriptionWhereInput!]
  OR: [EntryRelationTypeSubscriptionWhereInput!]
  NOT: [EntryRelationTypeSubscriptionWhereInput!]
}

input EntryRelationTypeUpdateDataInput {
  value: String
  description: String
  scope: ScopeUpdateOneRequiredInput
}

input EntryRelationTypeUpdateInput {
  value: String
  description: String
  scope: ScopeUpdateOneRequiredInput
}

input EntryRelationTypeUpdateManyMutationInput {
  value: String
  description: String
}

input EntryRelationTypeUpdateOneRequiredInput {
  create: EntryRelationTypeCreateInput
  update: EntryRelationTypeUpdateDataInput
  upsert: EntryRelationTypeUpsertNestedInput
  connect: EntryRelationTypeWhereUniqueInput
}

input EntryRelationTypeUpsertNestedInput {
  update: EntryRelationTypeUpdateDataInput!
  create: EntryRelationTypeCreateInput!
}

input EntryRelationTypeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  scope: ScopeWhereInput
  AND: [EntryRelationTypeWhereInput!]
  OR: [EntryRelationTypeWhereInput!]
  NOT: [EntryRelationTypeWhereInput!]
}

input EntryRelationTypeWhereUniqueInput {
  id: ID
}

type EntrySubscriptionPayload {
  mutation: MutationType!
  node: Entry
  updatedFields: [String!]
  previousValues: EntryPreviousValues
}

input EntrySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntryWhereInput
  AND: [EntrySubscriptionWhereInput!]
  OR: [EntrySubscriptionWhereInput!]
  NOT: [EntrySubscriptionWhereInput!]
}

input EntryUpdateInput {
  title: String
  content: String
  user: UserUpdateOneInput
  attributeValues: EntryAttributeValueUpdateManyWithoutEntryInput
  relatedEntriesFrom: RelatedEntryUpdateManyWithoutFromInput
  relatedEntriesTo: RelatedEntryUpdateManyWithoutToInput
}

input EntryUpdateManyMutationInput {
  title: String
  content: String
}

input EntryUpdateOneRequiredWithoutAttributeValuesInput {
  create: EntryCreateWithoutAttributeValuesInput
  update: EntryUpdateWithoutAttributeValuesDataInput
  upsert: EntryUpsertWithoutAttributeValuesInput
  connect: EntryWhereUniqueInput
}

input EntryUpdateOneRequiredWithoutRelatedEntriesFromInput {
  create: EntryCreateWithoutRelatedEntriesFromInput
  update: EntryUpdateWithoutRelatedEntriesFromDataInput
  upsert: EntryUpsertWithoutRelatedEntriesFromInput
  connect: EntryWhereUniqueInput
}

input EntryUpdateOneRequiredWithoutRelatedEntriesToInput {
  create: EntryCreateWithoutRelatedEntriesToInput
  update: EntryUpdateWithoutRelatedEntriesToDataInput
  upsert: EntryUpsertWithoutRelatedEntriesToInput
  connect: EntryWhereUniqueInput
}

input EntryUpdateWithoutAttributeValuesDataInput {
  title: String
  content: String
  user: UserUpdateOneInput
  relatedEntriesFrom: RelatedEntryUpdateManyWithoutFromInput
  relatedEntriesTo: RelatedEntryUpdateManyWithoutToInput
}

input EntryUpdateWithoutRelatedEntriesFromDataInput {
  title: String
  content: String
  user: UserUpdateOneInput
  attributeValues: EntryAttributeValueUpdateManyWithoutEntryInput
  relatedEntriesTo: RelatedEntryUpdateManyWithoutToInput
}

input EntryUpdateWithoutRelatedEntriesToDataInput {
  title: String
  content: String
  user: UserUpdateOneInput
  attributeValues: EntryAttributeValueUpdateManyWithoutEntryInput
  relatedEntriesFrom: RelatedEntryUpdateManyWithoutFromInput
}

input EntryUpsertWithoutAttributeValuesInput {
  update: EntryUpdateWithoutAttributeValuesDataInput!
  create: EntryCreateWithoutAttributeValuesInput!
}

input EntryUpsertWithoutRelatedEntriesFromInput {
  update: EntryUpdateWithoutRelatedEntriesFromDataInput!
  create: EntryCreateWithoutRelatedEntriesFromInput!
}

input EntryUpsertWithoutRelatedEntriesToInput {
  update: EntryUpdateWithoutRelatedEntriesToDataInput!
  create: EntryCreateWithoutRelatedEntriesToInput!
}

input EntryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  user: UserWhereInput
  attributeValues_every: EntryAttributeValueWhereInput
  attributeValues_some: EntryAttributeValueWhereInput
  attributeValues_none: EntryAttributeValueWhereInput
  relatedEntriesFrom_every: RelatedEntryWhereInput
  relatedEntriesFrom_some: RelatedEntryWhereInput
  relatedEntriesFrom_none: RelatedEntryWhereInput
  relatedEntriesTo_every: RelatedEntryWhereInput
  relatedEntriesTo_some: RelatedEntryWhereInput
  relatedEntriesTo_none: RelatedEntryWhereInput
  AND: [EntryWhereInput!]
  OR: [EntryWhereInput!]
  NOT: [EntryWhereInput!]
}

input EntryWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAttribute(data: AttributeCreateInput!): Attribute!
  updateAttribute(data: AttributeUpdateInput!, where: AttributeWhereUniqueInput!): Attribute
  updateManyAttributes(data: AttributeUpdateManyMutationInput!, where: AttributeWhereInput): BatchPayload!
  upsertAttribute(where: AttributeWhereUniqueInput!, create: AttributeCreateInput!, update: AttributeUpdateInput!): Attribute!
  deleteAttribute(where: AttributeWhereUniqueInput!): Attribute
  deleteManyAttributes(where: AttributeWhereInput): BatchPayload!
  createAttributeValue(data: AttributeValueCreateInput!): AttributeValue!
  updateAttributeValue(data: AttributeValueUpdateInput!, where: AttributeValueWhereUniqueInput!): AttributeValue
  updateManyAttributeValues(data: AttributeValueUpdateManyMutationInput!, where: AttributeValueWhereInput): BatchPayload!
  upsertAttributeValue(where: AttributeValueWhereUniqueInput!, create: AttributeValueCreateInput!, update: AttributeValueUpdateInput!): AttributeValue!
  deleteAttributeValue(where: AttributeValueWhereUniqueInput!): AttributeValue
  deleteManyAttributeValues(where: AttributeValueWhereInput): BatchPayload!
  createEntry(data: EntryCreateInput!): Entry!
  updateEntry(data: EntryUpdateInput!, where: EntryWhereUniqueInput!): Entry
  updateManyEntries(data: EntryUpdateManyMutationInput!, where: EntryWhereInput): BatchPayload!
  upsertEntry(where: EntryWhereUniqueInput!, create: EntryCreateInput!, update: EntryUpdateInput!): Entry!
  deleteEntry(where: EntryWhereUniqueInput!): Entry
  deleteManyEntries(where: EntryWhereInput): BatchPayload!
  createEntryAttributeValue(data: EntryAttributeValueCreateInput!): EntryAttributeValue!
  updateEntryAttributeValue(data: EntryAttributeValueUpdateInput!, where: EntryAttributeValueWhereUniqueInput!): EntryAttributeValue
  upsertEntryAttributeValue(where: EntryAttributeValueWhereUniqueInput!, create: EntryAttributeValueCreateInput!, update: EntryAttributeValueUpdateInput!): EntryAttributeValue!
  deleteEntryAttributeValue(where: EntryAttributeValueWhereUniqueInput!): EntryAttributeValue
  deleteManyEntryAttributeValues(where: EntryAttributeValueWhereInput): BatchPayload!
  createEntryRelationType(data: EntryRelationTypeCreateInput!): EntryRelationType!
  updateEntryRelationType(data: EntryRelationTypeUpdateInput!, where: EntryRelationTypeWhereUniqueInput!): EntryRelationType
  updateManyEntryRelationTypes(data: EntryRelationTypeUpdateManyMutationInput!, where: EntryRelationTypeWhereInput): BatchPayload!
  upsertEntryRelationType(where: EntryRelationTypeWhereUniqueInput!, create: EntryRelationTypeCreateInput!, update: EntryRelationTypeUpdateInput!): EntryRelationType!
  deleteEntryRelationType(where: EntryRelationTypeWhereUniqueInput!): EntryRelationType
  deleteManyEntryRelationTypes(where: EntryRelationTypeWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createRelatedEntry(data: RelatedEntryCreateInput!): RelatedEntry!
  updateRelatedEntry(data: RelatedEntryUpdateInput!, where: RelatedEntryWhereUniqueInput!): RelatedEntry
  upsertRelatedEntry(where: RelatedEntryWhereUniqueInput!, create: RelatedEntryCreateInput!, update: RelatedEntryUpdateInput!): RelatedEntry!
  deleteRelatedEntry(where: RelatedEntryWhereUniqueInput!): RelatedEntry
  deleteManyRelatedEntries(where: RelatedEntryWhereInput): BatchPayload!
  createScope(data: ScopeCreateInput!): Scope!
  updateScope(data: ScopeUpdateInput!, where: ScopeWhereUniqueInput!): Scope
  updateManyScopes(data: ScopeUpdateManyMutationInput!, where: ScopeWhereInput): BatchPayload!
  upsertScope(where: ScopeWhereUniqueInput!, create: ScopeCreateInput!, update: ScopeUpdateInput!): Scope!
  deleteScope(where: ScopeWhereUniqueInput!): Scope
  deleteManyScopes(where: ScopeWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
  author: User!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String!
  author: UserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutAuthorInput {
  published: Boolean
  title: String!
  content: String!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateManyDataInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateManyMutationInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateWithoutAuthorDataInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  attribute(where: AttributeWhereUniqueInput!): Attribute
  attributes(where: AttributeWhereInput, orderBy: AttributeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Attribute]!
  attributesConnection(where: AttributeWhereInput, orderBy: AttributeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AttributeConnection!
  attributeValue(where: AttributeValueWhereUniqueInput!): AttributeValue
  attributeValues(where: AttributeValueWhereInput, orderBy: AttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AttributeValue]!
  attributeValuesConnection(where: AttributeValueWhereInput, orderBy: AttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AttributeValueConnection!
  entry(where: EntryWhereUniqueInput!): Entry
  entries(where: EntryWhereInput, orderBy: EntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Entry]!
  entriesConnection(where: EntryWhereInput, orderBy: EntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntryConnection!
  entryAttributeValue(where: EntryAttributeValueWhereUniqueInput!): EntryAttributeValue
  entryAttributeValues(where: EntryAttributeValueWhereInput, orderBy: EntryAttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntryAttributeValue]!
  entryAttributeValuesConnection(where: EntryAttributeValueWhereInput, orderBy: EntryAttributeValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntryAttributeValueConnection!
  entryRelationType(where: EntryRelationTypeWhereUniqueInput!): EntryRelationType
  entryRelationTypes(where: EntryRelationTypeWhereInput, orderBy: EntryRelationTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntryRelationType]!
  entryRelationTypesConnection(where: EntryRelationTypeWhereInput, orderBy: EntryRelationTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntryRelationTypeConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  relatedEntry(where: RelatedEntryWhereUniqueInput!): RelatedEntry
  relatedEntries(where: RelatedEntryWhereInput, orderBy: RelatedEntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RelatedEntry]!
  relatedEntriesConnection(where: RelatedEntryWhereInput, orderBy: RelatedEntryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RelatedEntryConnection!
  scope(where: ScopeWhereUniqueInput!): Scope
  scopes(where: ScopeWhereInput, orderBy: ScopeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Scope]!
  scopesConnection(where: ScopeWhereInput, orderBy: ScopeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScopeConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type RelatedEntry {
  id: ID!
  from: Entry!
  to: Entry!
  relationType: EntryRelationType!
}

type RelatedEntryConnection {
  pageInfo: PageInfo!
  edges: [RelatedEntryEdge]!
  aggregate: AggregateRelatedEntry!
}

input RelatedEntryCreateInput {
  from: EntryCreateOneWithoutRelatedEntriesFromInput!
  to: EntryCreateOneWithoutRelatedEntriesToInput!
  relationType: EntryRelationTypeCreateOneInput!
}

input RelatedEntryCreateManyWithoutFromInput {
  create: [RelatedEntryCreateWithoutFromInput!]
  connect: [RelatedEntryWhereUniqueInput!]
}

input RelatedEntryCreateManyWithoutToInput {
  create: [RelatedEntryCreateWithoutToInput!]
  connect: [RelatedEntryWhereUniqueInput!]
}

input RelatedEntryCreateWithoutFromInput {
  to: EntryCreateOneWithoutRelatedEntriesToInput!
  relationType: EntryRelationTypeCreateOneInput!
}

input RelatedEntryCreateWithoutToInput {
  from: EntryCreateOneWithoutRelatedEntriesFromInput!
  relationType: EntryRelationTypeCreateOneInput!
}

type RelatedEntryEdge {
  node: RelatedEntry!
  cursor: String!
}

enum RelatedEntryOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RelatedEntryPreviousValues {
  id: ID!
}

input RelatedEntryScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [RelatedEntryScalarWhereInput!]
  OR: [RelatedEntryScalarWhereInput!]
  NOT: [RelatedEntryScalarWhereInput!]
}

type RelatedEntrySubscriptionPayload {
  mutation: MutationType!
  node: RelatedEntry
  updatedFields: [String!]
  previousValues: RelatedEntryPreviousValues
}

input RelatedEntrySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RelatedEntryWhereInput
  AND: [RelatedEntrySubscriptionWhereInput!]
  OR: [RelatedEntrySubscriptionWhereInput!]
  NOT: [RelatedEntrySubscriptionWhereInput!]
}

input RelatedEntryUpdateInput {
  from: EntryUpdateOneRequiredWithoutRelatedEntriesFromInput
  to: EntryUpdateOneRequiredWithoutRelatedEntriesToInput
  relationType: EntryRelationTypeUpdateOneRequiredInput
}

input RelatedEntryUpdateManyWithoutFromInput {
  create: [RelatedEntryCreateWithoutFromInput!]
  delete: [RelatedEntryWhereUniqueInput!]
  connect: [RelatedEntryWhereUniqueInput!]
  disconnect: [RelatedEntryWhereUniqueInput!]
  update: [RelatedEntryUpdateWithWhereUniqueWithoutFromInput!]
  upsert: [RelatedEntryUpsertWithWhereUniqueWithoutFromInput!]
  deleteMany: [RelatedEntryScalarWhereInput!]
}

input RelatedEntryUpdateManyWithoutToInput {
  create: [RelatedEntryCreateWithoutToInput!]
  delete: [RelatedEntryWhereUniqueInput!]
  connect: [RelatedEntryWhereUniqueInput!]
  disconnect: [RelatedEntryWhereUniqueInput!]
  update: [RelatedEntryUpdateWithWhereUniqueWithoutToInput!]
  upsert: [RelatedEntryUpsertWithWhereUniqueWithoutToInput!]
  deleteMany: [RelatedEntryScalarWhereInput!]
}

input RelatedEntryUpdateWithoutFromDataInput {
  to: EntryUpdateOneRequiredWithoutRelatedEntriesToInput
  relationType: EntryRelationTypeUpdateOneRequiredInput
}

input RelatedEntryUpdateWithoutToDataInput {
  from: EntryUpdateOneRequiredWithoutRelatedEntriesFromInput
  relationType: EntryRelationTypeUpdateOneRequiredInput
}

input RelatedEntryUpdateWithWhereUniqueWithoutFromInput {
  where: RelatedEntryWhereUniqueInput!
  data: RelatedEntryUpdateWithoutFromDataInput!
}

input RelatedEntryUpdateWithWhereUniqueWithoutToInput {
  where: RelatedEntryWhereUniqueInput!
  data: RelatedEntryUpdateWithoutToDataInput!
}

input RelatedEntryUpsertWithWhereUniqueWithoutFromInput {
  where: RelatedEntryWhereUniqueInput!
  update: RelatedEntryUpdateWithoutFromDataInput!
  create: RelatedEntryCreateWithoutFromInput!
}

input RelatedEntryUpsertWithWhereUniqueWithoutToInput {
  where: RelatedEntryWhereUniqueInput!
  update: RelatedEntryUpdateWithoutToDataInput!
  create: RelatedEntryCreateWithoutToInput!
}

input RelatedEntryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  from: EntryWhereInput
  to: EntryWhereInput
  relationType: EntryRelationTypeWhereInput
  AND: [RelatedEntryWhereInput!]
  OR: [RelatedEntryWhereInput!]
  NOT: [RelatedEntryWhereInput!]
}

input RelatedEntryWhereUniqueInput {
  id: ID
}

type Scope {
  id: ID!
  name: String!
  description: String
  user: User!
}

type ScopeConnection {
  pageInfo: PageInfo!
  edges: [ScopeEdge]!
  aggregate: AggregateScope!
}

input ScopeCreateInput {
  name: String!
  description: String
  user: UserCreateOneInput!
}

input ScopeCreateOneInput {
  create: ScopeCreateInput
  connect: ScopeWhereUniqueInput
}

type ScopeEdge {
  node: Scope!
  cursor: String!
}

enum ScopeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScopePreviousValues {
  id: ID!
  name: String!
  description: String
}

type ScopeSubscriptionPayload {
  mutation: MutationType!
  node: Scope
  updatedFields: [String!]
  previousValues: ScopePreviousValues
}

input ScopeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScopeWhereInput
  AND: [ScopeSubscriptionWhereInput!]
  OR: [ScopeSubscriptionWhereInput!]
  NOT: [ScopeSubscriptionWhereInput!]
}

input ScopeUpdateDataInput {
  name: String
  description: String
  user: UserUpdateOneRequiredInput
}

input ScopeUpdateInput {
  name: String
  description: String
  user: UserUpdateOneRequiredInput
}

input ScopeUpdateManyMutationInput {
  name: String
  description: String
}

input ScopeUpdateOneRequiredInput {
  create: ScopeCreateInput
  update: ScopeUpdateDataInput
  upsert: ScopeUpsertNestedInput
  connect: ScopeWhereUniqueInput
}

input ScopeUpsertNestedInput {
  update: ScopeUpdateDataInput!
  create: ScopeCreateInput!
}

input ScopeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  user: UserWhereInput
  AND: [ScopeWhereInput!]
  OR: [ScopeWhereInput!]
  NOT: [ScopeWhereInput!]
}

input ScopeWhereUniqueInput {
  id: ID
}

type Subscription {
  attribute(where: AttributeSubscriptionWhereInput): AttributeSubscriptionPayload
  attributeValue(where: AttributeValueSubscriptionWhereInput): AttributeValueSubscriptionPayload
  entry(where: EntrySubscriptionWhereInput): EntrySubscriptionPayload
  entryAttributeValue(where: EntryAttributeValueSubscriptionWhereInput): EntryAttributeValueSubscriptionPayload
  entryRelationType(where: EntryRelationTypeSubscriptionWhereInput): EntryRelationTypeSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  relatedEntry(where: RelatedEntrySubscriptionWhereInput): RelatedEntrySubscriptionPayload
  scope(where: ScopeSubscriptionWhereInput): ScopeSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  name: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  name: String
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  name: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
export interface Image {
  value?: {
    src: string | null;
    alt: string | null;
  };
  src?: string | null;
  alt?: string | null;
}

export interface Link {
  path: string | null;
}
export interface FieldValue<T> {
  value: T;
}

export interface BlogItem {
  // displayName: string;
  cardImage?: Image;
  pageTitle: FieldValue<string>;
  blogTitle: FieldValue<string>;
  shortDescription: FieldValue<string>;
  goToBlog: Link;
  publishDate: FieldValue<string>;
}
export interface SortResponse {
  search: {
    total: number;
    pageInfo: {
      endCursor: string;
      hasNext: boolean;
    };
    results: BlogItem[];
  };
}

export enum QueryOperators {
  EQ = 'EQ',
  CONTAINS = 'CONTAINS',
  NEQ = 'NEQ',
  NCONTAINS = 'NCONTAINS',
  LT = 'LT',
  LTE = 'LTE',
  GT = 'GT',
  GTE = 'GTE',
}

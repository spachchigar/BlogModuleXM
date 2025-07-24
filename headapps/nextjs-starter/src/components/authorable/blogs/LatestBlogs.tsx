import { JSX, useEffect, useState } from 'react';
import BlogCard from '../../helpers/BlogCard';
import { container } from '../../../assets/tailwindcss';
import { FieldValue, Link, Image } from 'src/utils/blogListType';
import { graphQLClient } from 'src/utils/graphqlClient';
import { BLOG_LIST } from 'src/utils/graphqlQuery';
import { Button } from '../../components/ui/button';
import Pagination from '../../helpers/Pagination';
import { ComponentProps } from 'lib/component-props';
import { PageContent } from 'models/Feature.Blog Module.Model';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';

type LatestBlogProps = ComponentProps & PageContent.BlogList;
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

interface SortOptions {
  sortOrder: 'ASC' | 'DESC';
  // Add other sort-related properties here if needed in the future
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
export const Default = (props: LatestBlogProps): JSX.Element => {
  /** ➊ Allow null and start with it */
  const ITEMS_PER_PAGE = 3;

  const [blogs, setBlogs] = useState<SortResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [endCursors, setCursors] = useState<string[]>(['']);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentSortOrder, setCurrentSortOrder] = useState<'ASC' | 'DESC'>('DESC'); // Default sort order

  // const [pageNumber, setPageNumber] = useState(1);
  const handleNext = async () => {
    setCurrentPage((prv) => prv + 1);
  };
  const handlePrev = async () => {
    setCurrentPage((prv) => prv - 1);
  };
  const handleSortChange = (order: 'ASC' | 'DESC') => {
    if (currentSortOrder !== order) {
      setCurrentSortOrder(order);
      setCurrentPage(1); // Reset to first page when sort order changes
      setCursors(['']); // Reset cursors when sort order changes
    }
  };
  const fetchBlogs = async ({ sortOrder }: SortOptions) => {
    try {
      const result = await graphQLClient.request<SortResponse>(BLOG_LIST, {
        first: ITEMS_PER_PAGE,
        after: endCursors[currentPage - 1],
        path: '{F372EB01-1228-45D3-8FEC-92808218647B}',
        templateId: '{C93ED2F0-0725-4727-A332-E9927FDB12C4}',
        sortOrder,
      });
      const endCursor = result?.search?.pageInfo?.endCursor;
      setBlogs(result);
      setCursors((prv) => [...prv, endCursor]);
      setTotalPage(Math.ceil(result?.search?.total / ITEMS_PER_PAGE));
    } catch (err) {
      console.error('GraphQL error', err);
      setBlogs(null);
      setCursors(['']);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs({ sortOrder: currentSortOrder });
    console.log('Called fetchBlogs');
  }, [currentPage, currentSortOrder]);

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!blogs) {
    return <div>No Blog Found.</div>;
  }

  return (
    <div className={`${container()} my-5`}>
      <Text field={props?.fields?.title} tag="h1" className="mb-6 text-3xl font-bold" />
      <div className="my-5 flex gap-2">
        <Button
          variant={currentSortOrder === 'ASC' ? 'default' : 'secondary'}
          onClick={() => handleSortChange('ASC')}
          className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${currentSortOrder === 'ASC' ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'} `}
        >
          Oldest Blogs
        </Button>
        <Button
          variant={currentSortOrder === 'DESC' ? 'default' : 'secondary'}
          onClick={() => handleSortChange('DESC')}
          className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${currentSortOrder === 'DESC' ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'} `}
        >
          Newest Blogs
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* ➍ Need an explicit return when using braces */}
        {blogs?.search.results.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
};

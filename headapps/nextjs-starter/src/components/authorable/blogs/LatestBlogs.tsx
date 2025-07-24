import { JSX, useEffect, useState } from 'react';
import BlogCard from '../../helpers/BlogCard';
import { container } from '../../../assets/tailwindcss';
import { FieldValue, Link, Image } from 'src/utils/blogListType';
import Pagination from '../../helpers/Pagination';
import { ComponentProps } from 'lib/component-props';
import { PageContent } from 'models/Feature.Blog Module.Model';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

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
  const router = useRouter();
  const { page, sort } = router.query;
  const ITEMS_PER_PAGE = props.fields?.pageItemCount?.value ?? 3;
  const currentPage = parseInt((page as string) ?? '1');
  const currentSortOrder = (sort as 'ASC' | 'DESC') ?? 'DESC';
  const [blogs, setBlogs] = useState<SortResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchBlogs = async ({ sortOrder }: SortOptions) => {
    try {
      const postData = {
        path: '{F372EB01-1228-45D3-8FEC-92808218647B}',
        templateId: '{C93ED2F0-0725-4727-A332-E9927FDB12C4}',
        first: ITEMS_PER_PAGE,
        currentPage: currentPage,
        sortOrder,
      };
      const result = await fetch('api/blogs/getPaginatedBlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await result.json();
      if (result.status === 200) {
        setBlogs(data.blogs);
        setTotalPage(Math.ceil(data.blogs?.search?.total / ITEMS_PER_PAGE));
      } else if (result.status === 201) {
        console.log('No Blogs found');
        setBlogs(null);
      } else {
        console.error('The following error occured: ', data.errMessage);
      }
    } catch (err) {
      console.error('GraphQL error', err);
      setBlogs(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchBlogs({ sortOrder: currentSortOrder });
    }
  }, [currentPage, currentSortOrder, router.isReady]);

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
        <NextLink
          scroll={false}
          href={`/blogs?sort=ASC`}
          className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${currentSortOrder === 'ASC' ? 'pointer-events-none border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'} `}
        >
          Oldest Blogs
        </NextLink>
        <NextLink
          scroll={false}
          href={`/blogs?sort=DESC`}
          className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${currentSortOrder === 'DESC' ? 'pointer-events-none border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'} `}
        >
          Newest Blogs
        </NextLink>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* ➍ Need an explicit return when using braces */}
        {blogs?.search.results.map((blog, index) => (
          <BlogCard key={index} data={blog} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPage={totalPage} currentSort={currentSortOrder} />
    </div>
  );
};

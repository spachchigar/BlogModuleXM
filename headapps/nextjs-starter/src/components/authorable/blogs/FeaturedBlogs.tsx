import { JSX, useEffect, useState } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { PageContent } from '../../../../models/Feature.Blog Module.Model';
import BlogCard from '../../helpers/BlogCard';
import { SortResponse } from './LatestBlogs';
import { container } from 'assets/tailwindcss';
import { graphQLClient } from 'src/utils/graphqlClient';
import { FEATURED_LIST } from 'src/utils/graphqlQuery';
import Pagination from '../../helpers/Pagination';

type FeaturedBlogsProps = ComponentProps & PageContent.BlogList;

export const Default = (props: FeaturedBlogsProps): JSX.Element => {
  const ITEMS_PER_PAGE = 3;

  const [blogs, setBlogs] = useState<SortResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [endCursors, setCursors] = useState<string[]>(['']);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchBlogs = async () => {
    try {
      const result = await graphQLClient.request<SortResponse>(FEATURED_LIST, {
        first: ITEMS_PER_PAGE,
        after: endCursors[currentPage - 1],
        path: '{F372EB01-1228-45D3-8FEC-92808218647B}',
        templateId: '{C93ED2F0-0725-4727-A332-E9927FDB12C4}',
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

  const handleNext = async () => {
    setCurrentPage((prv) => prv + 1);
  };
  const handlePrev = async () => {
    setCurrentPage((prv) => prv - 1);
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!blogs) {
    return <div>No Blog Found.</div>;
  }
  return (
    <div className={`${container()} my-5`}>
      <div className="component-content">
        {/* <h1 className="mb-6 text-3xl font-bold"> */}
        <Text field={props?.fields?.title} tag="h1" className="mb-6 text-3xl font-bold" />
        {/* </h1> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

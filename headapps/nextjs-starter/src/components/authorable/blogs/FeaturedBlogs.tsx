import { JSX, useEffect, useState } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { PageContent } from '../../../../models/Feature.Blog Module.Model';
import BlogCard from '../../helpers/BlogCard';
import { SortResponse } from './LatestBlogs';
import { container } from 'assets/tailwindcss';

type FeaturedBlogsProps = ComponentProps & PageContent.BlogList;

export const Default = (props: FeaturedBlogsProps): JSX.Element => {
  const [blogs, setBlogs] = useState<SortResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlogs = async () => {
    try {
      const postData = {
        path: '{F372EB01-1228-45D3-8FEC-92808218647B}',
        templateId: '{C93ED2F0-0725-4727-A332-E9927FDB12C4}',
        blogType: 'FEATURED',
      };
      const result = await fetch('api/blogs/getBlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await result.json();
      if (result.status === 200) {
        setBlogs(data.blogs);
      } else if (result.status === 201) {
        console.log('No blogs found');
        setBlogs(null);
      } else {
        console.error('The following error occured: ', data.errMessage);
        setBlogs(null);
      }
    } catch (err) {
      console.error('GraphQL error', err);
      setBlogs(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!blogs) {
    return <></>;
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
      </div>
    </div>
  );
};

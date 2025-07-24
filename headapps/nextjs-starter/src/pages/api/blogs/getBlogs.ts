import { SortResponse } from 'components/authorable/blogs/LatestBlogs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { graphQLClient } from 'src/utils/graphqlClient';
import { ARCHIVED_BLOGS, FEATURED_BLOGS } from 'src/utils/graphqlQuery';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { path, templateId, blogType } = req.body;
    const graphqlQuery = blogType === 'ARCHIVED' ? ARCHIVED_BLOGS : FEATURED_BLOGS;
    try {
      const blogData = await graphQLClient.request<SortResponse>(graphqlQuery, {
        path: path,
        templateId: templateId,
      });
      if (!blogData.search.results.length) {
        res.status(201).json({ noContent: 'No Blogs Found' });
      }
      res.status(200).json({ blogs: blogData });
    } catch (err) {
      res.status(200).json({ errMessage: err });
    }
  }
}

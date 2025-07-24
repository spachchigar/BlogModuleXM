import { SortResponse } from 'components/authorable/blogs/LatestBlogs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { graphQLClient } from 'src/utils/graphqlClient';
import { GET_CURSOR, LATEST_BLOGS } from 'src/utils/graphqlQuery';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { path, templateId, first, currentPage, sortOrder } = req.body;

    try {
      if (currentPage > 1) {
        const blogEndCursor = await graphQLClient.request<SortResponse>(GET_CURSOR, {
          path: path,
          templateId: templateId,
          first: first * (currentPage - 1),
          sortOrder,
        });
        const blogData = await graphQLClient.request<SortResponse>(LATEST_BLOGS, {
          path: path,
          templateId: templateId,
          first,
          after: blogEndCursor.search.pageInfo.endCursor ?? '',
          sortOrder,
        });
        if (!blogData.search.results.length) {
          res.status(201).json({ noContent: 'No Blogs Found', endCursor: blogEndCursor });
        }
        res.status(200).json({ blogs: blogData, endCursor: blogEndCursor });
      } else {
        const blogData = await graphQLClient.request<SortResponse>(LATEST_BLOGS, {
          path: path,
          templateId: templateId,
          first,
          after: '',
          sortOrder,
        });
        if (!blogData.search.results.length) {
          res.status(201).json({ noContent: 'No Blogs Found' });
        }
        res.status(200).json({ blogs: blogData });
      }
    } catch (err) {
      res.status(200).json({ errMessage: err });
    }
  }
}

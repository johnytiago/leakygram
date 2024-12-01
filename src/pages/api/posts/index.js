import { createPost } from './create';
import { getPosts } from './list';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return getPosts(req, res);
  }
  if (req.method === 'POST') {
    return createPost(req, res);
  }
}

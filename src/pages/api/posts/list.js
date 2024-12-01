import fs from 'fs/promises';

export const getPosts = async (req, res) => {
  const dataPath = process.cwd() + '/public/posts.json';
  let { start = 0, end = 1 } = req.query;

  try {
    const fileContents = await fs.readFile(dataPath, 'utf-8');
    const jsonData = JSON.parse(fileContents);
    // Sort descending by postId
    jsonData.posts.sort((a, b) => b.postID - a.postID);
    const posts = jsonData.posts.slice(start, end);

    res.status(200).json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to get data' });
  }
}
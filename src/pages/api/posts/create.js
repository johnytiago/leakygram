// {
//     "postID": "13",
//     "text": "Did you know today is National Rescue Dog Day?    Consider donating to your local animal shelter to help homeless pups find their forever homes! #rescuedog #nationalrescuedogday",
//     "created_at": "2024-05-26T11:30:00-04:00",
//     "image_link": "https://picsum.photos/seed/14/800/",
//     "user": {
//         "username": "pawsitive_vibes",
//         "profile_picture": "https://picsum.photos/seed/15/200/"
//     },
//     "engagement": {
//         "likes": 342,
//         "comments": 57,
//         "shares": 29
//     }
// }
import fs from 'fs/promises';

const postsBeingSaved = [];
export const createPost = async (req, res) => {
    const dataPath = process.cwd() + '/public/posts.json';
    const { text, image } = req.body;
    
    if (!text || !image) {
        return res.status(400).json({ error: 'Post missing text or image' });
    }

    const newPost = {
        text,
        created_at: new Date().toISOString(),
        image_link: image,
        user: {
            username: "LeaksMemory",
            profile_picture: "https://picsum.photos/200/"
        },
        engagement: {
            likes: 0,
            comments: 0,
            shares: 0
        }
    }
    
    postsBeingSaved.push({ ...newPost, fill: Array(1000000).fill('*').join('')});
    
    try {
        const fileContents = await fs.readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(fileContents);
    
        jsonData.posts.push({ ...newPost, postID: jsonData.posts.length + 1 });
    
        await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
    
        res.status(201).json(newPost);
    } catch (err) {
        // Remove the post from the postsBeingSaved array
        postsBeingSaved.pop();
        res.status(500).json({ error: 'Failed to create post' });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb' // Set desired value here
        }
    }
}
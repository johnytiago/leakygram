import { useEffect, useState } from "react";
import Post from "./Post";
import { searchForItem } from "@/util/localStorageHelpers";

// container for the many posts to be loaded 
export default function PostsContainer({ favouritesPage }) {

    // Posts to be fetched using API
    let start = 0, end = 15;

    const [data, setData] = useState(null);

    // Holds the state of the data: -1-> error,0->loading, 1-> Success
    const [status, setStatus] = useState(0);

    useEffect(() => {
        // On mount attempt to get data
        const fetchData = () => {
            fetch(`/api/posts?start=${start}&end=${end}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    setStatus(1);
                }).catch((e) => {
                    console.error(e);
                    setStatus(-1);
                })
        };

        fetchData();

        // Fetch new posts every 5 seconds
        setInterval(fetchData, 5000);
    }, []);

    if (status == -1) {
        console.error("Failed to Fetch data.");
        return (<div className="fullScreenText">Failed to fetch posts...</div>)
    }

    if (!data) return <p className="fullScreenText">No profile data</p>
    return (
        <div>
            {favouritesPage ? (
                data.map((post, index) => {
                    if (searchForItem(post.postID) != -1)
                        return (<Post data={post} key={index} />)
                }
                )
            ) : (
                data.map((post, index) => (
                    <Post data={post} key={index} />
                ))
            )}
        </div>
    );
}

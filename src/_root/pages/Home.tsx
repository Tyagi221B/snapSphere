import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {data: posts, isLoading:isPostLoading, isError: isErrorPosts} = useGetRecentPosts();

  // const document = posts?.documents;
  // console.log(posts)


  return (
    <div className="flex flex-1 ">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading || isErrorPosts && !posts ? (
            <Loader/>
          ): (
            <ul 
            className="flex flex-col flex-1 gap-9 w-full"
            // key={posts?.documents.creator.$id}
            >
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
import { CircularProgress, Grid } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../type/AppRoute";
import { useEffect } from "react";
import { PostModel } from "../../../back-end/src/models";
import PostDisplay from "../component/display/PostDisplay";
import { CreatePostField } from "../component/createPost/CreatePostField";

const Home = () => {
  const User = useUserContext();
  const Navigate = useNavigate();

  const posts: PostModel[] = [
    {
      id: "1",
      created_at: new Date(2024, 2, 10),
      content:
        "My husband (42m) and I (41f) tried to have children for 13 years before we accepted that we were never going to have it happen for us. We spent a lot of time hoping and trying different things and nothing worked. I was 35 when we decided to come to terms with our life as a childfree couple.",
      like_count: 10,
      comment_count: 5,
      save_count: 3,
      user_id: "68ecc959-e06e-11ee-8248-0242ac120002",
    },
    {
      id: "2",
      created_at: new Date(2023, 7, 16),
      content:
        "I'm feeling extremely frustrated with my Pixel 8 Pro. Even during my vacation in Dubai, I find myself constantly reliant on a power bank.",
      like_count: 15,
      comment_count: 8,
      save_count: 2,
      user_id: "68eccaf7-e06e-11ee-8248-0242ac120002",
    },
  ];

  useEffect(() => {
    if (!User.isLoading && User.isNewUser) Navigate(AppRoute.SIGNUP);
  }, [User.isLoading, User.isNewUser, Navigate]);

  if (User.isLoading || User.isNewUser) return <CircularProgress />;

  return (
    <div>
      <CreatePostField />
      {posts.map((post) => (
        <PostDisplay
          key={post.id}
          post={post}
          minWidth="360px"
          maxWidth="752px"
          padding="15px"
        />
      ))}
    </div>
  );
};

export default Home;

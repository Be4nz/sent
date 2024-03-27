import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "../../api/Api";
import { useUserContext } from "../../context/UserContext";
import { timeSince } from "../../function/TimeSince";
import { countToDisplay } from "../../function/CountToDisplay";
import { PostModel, UserModel } from "../../model";
import PostSkeletonDisplay from "./PostSkeletonDisplay";
import { redirect, useNavigate } from "react-router";

const PostDisplay: React.FC<{
  post: PostModel;
  minWidth?: string;
  maxWidth?: string;
  my?: string;
  mx?: string;
}> = ({ post, minWidth, maxWidth, my, mx }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentSelected, setIsCommentSelected] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [creator, setCreator] = useState<UserModel>();

  const Theme = useTheme();
  const User = useUserContext();
  const navigate = useNavigate();

  //TODO connect liking to database
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  //TODO implement comment section
  const handleCommentClick = () => {
    setIsCommentSelected(!isCommentSelected);

    navigate("/post/" + post.id);
  };

  //TODO connect saving to database
  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    //TODO recieve like status from database if current user is already liked
    const getLikeStatus = async () => {};
    //TODO recieve save status from database if current user is already liked
    const getSaveStatus = async () => {};

    const getCreatorData = async () => {
      setIsLoading(true);
      try {
        const response = await get<UserModel>(
          `/users/profile/${post.user_id}`,
          User.token
        );
        setCreator(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getCreatorData();
  }, [User.token, post.user_id]);

  if (isLoading)
    return (
      <PostSkeletonDisplay
        minWidth={minWidth}
        maxWidth={maxWidth}
        my={my}
        mx={mx}
      />
    );

  return (
    <ListItem divider>
      <Grid
        container
        direction="row"
        minWidth={minWidth}
        maxWidth={maxWidth}
        my={my}
        mx={mx}
        width={"100%"}
      >
        <Grid item xs={1.5}>
          <Avatar alt="avatar" src={creator?.picture} />
        </Grid>
        <Grid item xs={10.5}>
          <Grid container direction="column">
            <Grid container direction="row">
              <Grid item xs={7}>
                <Typography fontWeight="bold">
                  @{creator?.username || "unknown"}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  textAlign="right"
                  color={Theme.palette.text.secondary}
                >
                  {post.created_at
                    ? timeSince(new Date(post.created_at))
                    : "unknown"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography sx={{ wordBreak: "break-word" }}>
                {post.content}
              </Typography>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={2.5}>
                <Grid container direction="row">
                  <Grid item>
                    <IconButton onClick={handleLikeClick}>
                      {!isLiked && (
                        <FavoriteBorderIcon
                          sx={{ color: Theme.palette.text.secondary }}
                        />
                      )}
                      {isLiked && (
                        <FavoriteIcon
                          sx={{ color: Theme.palette.primary.main }}
                        />
                      )}
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ my: "auto" }}>
                    <Typography color={Theme.palette.text.secondary}>
                      {countToDisplay(post.like_count)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2.5}>
                <Grid container direction="row">
                  <Grid item>
                    <IconButton onClick={handleCommentClick}>
                      {!isCommentSelected && (
                        <ModeCommentOutlinedIcon
                          sx={{ color: Theme.palette.text.secondary }}
                        />
                      )}
                      {isCommentSelected && <ModeCommentIcon />}
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ my: "auto" }}>
                    <Typography color={Theme.palette.text.secondary}>
                      {countToDisplay(post.comment_count)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2.5}>
                <Grid container direction="row">
                  <Grid item>
                    <IconButton onClick={handleSaveClick}>
                      {!isSaved && (
                        <BookmarkBorderIcon
                          sx={{ color: Theme.palette.text.secondary }}
                        />
                      )}
                      {isSaved && (
                        <BookmarkIcon
                          sx={{ color: Theme.palette.primary.main }}
                        />
                      )}
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ my: "auto" }}>
                    <Typography color={Theme.palette.text.secondary}>
                      {countToDisplay(post.save_count)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default PostDisplay;

import { Avatar, Input, Modal } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import TagIcon from "@mui/icons-material/Tag";
import { useUserContext } from "../../context/UserContext";
import { PostModel } from "../../type/Post";
import { post } from "../../api/Api";

interface Props {}

export const CreatePostField: React.FC<Props> = () => {
  const theme = useTheme();

  const Field = styled("div")`
    max-width: 796px;
    width: 80%;
    height: 148px;
    background-color: ${theme.palette.background.default};
    color: ${theme.palette.text.primary};
    border-color: #888888;
    border-radius: 15px;
    border-width: 1px;
    border-style: solid;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    :hover {
      cursor: pointer;
    }
  `;

  const Text = styled("p")`
    margin-left: 25px;
  `;

  const Icons = styled("div")`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-left: 86px;
    color: ${theme.palette.primary.main};
  `;

  const SendButton = styled("button")`
    background-color: ${theme.palette.primary.main};
    border: none;
    width: 80px;
    height: 41px;
    border-radius: 60px;
    font-size: 15px;
    color: ${theme.palette.text.primary};
  `;

  const TopPart = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const BottomPart = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
  `;

  const [showModal, setShowModal] = useState<boolean>(false);

  const User = useUserContext();

  const handleFieldClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePost = async (content: string) => {
    try {
      const newPost: PostModel = {
        content: content,
        user_id: User.id,
      };

      await post<PostModel>("/post", newPost, User.token);
      handleCloseModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Field onClick={handleFieldClick}>
        <TopPart>
          <Avatar />
          <Text>Send your message to the world...</Text>
        </TopPart>
        <BottomPart>
          <Icons>
            <CropOriginalIcon fontSize="large" style={{ fontSize: "1.5em" }} />
            <TagIcon fontSize="large" style={{ fontSize: "1.5em" }} />
          </Icons>
          <SendButton>Send</SendButton>
        </BottomPart>
      </Field>
      <CreatePostModal
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        handlePost={handlePost}
      />
    </>
  );
};

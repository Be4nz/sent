import { Avatar, Input, Modal, styled, useTheme } from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import TagIcon from "@mui/icons-material/Tag";
import { PostModel } from "../../type/Post";
import { useRef, useState } from "react";

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  handlePost: (content: string) => Promise<void>;
}

export const CreatePostModal: React.FC<Props> = ({
  showModal,
  handleCloseModal,
  handlePost,
}) => {
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
  `;

  const ModalField = styled(Field)`
    height: 300px;
    justify-content: space-between;
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
    :hover {
      cursor: pointer;
    }
  `;

  const ModalTopPart = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  `;

  const BottomPart = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
  `;

  const CenteredModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const TextInput = styled(Input)`
    width: 88%;
    height: 90%;
    padding: 8px;
    box-sizing: border-box;
    // Allow for vertical resizing
    resize: vertical;
    // Enable text wrapping
    white-space: pre-wrap;
    overflow-wrap: break-word;
    // Ensure text alignment to the top left
    vertical-align: top;
    background-color: ${theme.palette.background.default};
    border-color: #888888;
    border-radius: 15px;
    border-width: 1px;
    border-style: solid;
    color: ${theme.palette.text.primary};
  `;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CenteredModal open={showModal} onClose={handleCloseModal}>
      <ModalField>
        <ModalTopPart>
          <Avatar />
          <TextInput ref={inputRef} disableUnderline />
        </ModalTopPart>
        <BottomPart>
          <Icons>
            <CropOriginalIcon fontSize="large" style={{ fontSize: "1.5em" }} />
            <TagIcon fontSize="large" style={{ fontSize: "1.5em" }} />
          </Icons>
          <SendButton onClick={() => handlePost(inputRef.current?.value || "")}>
            Send
          </SendButton>
        </BottomPart>
      </ModalField>
    </CenteredModal>
  );
};

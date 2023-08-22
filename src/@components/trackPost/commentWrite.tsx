import CommentFileInput from "./commentFileInput";
import CommentTextInput from "./commentTextInput";
import CommentWriteLayout from "./commentWriteLayout";

export default function CommentWrite() {
  return (
    <CommentWriteLayout>
      <CommentFileInput />
      <CommentTextInput />
    </CommentWriteLayout>
  );
}

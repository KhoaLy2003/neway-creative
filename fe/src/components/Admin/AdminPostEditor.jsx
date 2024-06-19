import React, { Fragment, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Input } from "antd";
import { createPost } from "../../api/post";

function AdminPostEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log(event.target);
    setContent(data);
  };

  const postCreateDto = {
    title: title,
    description: description,
    content: content,
    thumbnail: "",
  };

  const handleCreatePost = async () => {
    const response = await createPost(postCreateDto);

    const data = response.data;

    console.log("Response with data: ", data);
    console.log("Post created with content: ", content);
  };

  return (
    <Fragment>
      <div className="post mb-3">
        <h2 className="mb-3">Post Title</h2>
        <form method="POST">
          <Input
            name="title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            name="description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "Write your post here...",
              image: {
                toolbar: ["insertImage"],
              },
              ckfinder: {
                uploadUrl:
                  "/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
                options: {
                  resourceType: "Images",
                },
              },
            }}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={handleEditorChange}
          />
        </form>
      </div>
      <Button onClick={handleCreatePost} type="primary" htmlType="submit">
        Create Post
      </Button>
    </Fragment>
  );
}

export default AdminPostEditor;

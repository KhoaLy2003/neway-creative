import React, { Fragment, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "antd";

function AdminPostEditor() {
  const [content, setContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleCreatePost = () => {
    console.log("Post created with content: ", content);
  };

  return (
    <Fragment>
      <div className="post mb-3">
        <h2 className="mb-3">Post Title</h2>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "Write your post here...",
            image: {
              toolbar: ["imageUpload", "imageInsert"], // Add the image toolbar options
              upload: {
                types: ["jpeg", "png", "gif", "bmp", "webp"],
                maxSize: 1024 * 1024, // 1 MB
              },
            },
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={handleEditorChange}
          onBlur={(event, editor) => {
            console.log(event);
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log(event);
            console.log("Focus.", editor);
          }}
        />
      </div>
      <Button onClick={handleCreatePost} type="primary" htmlType="submit">
        Create Post
      </Button>
    </Fragment>
  );
}

export default AdminPostEditor;

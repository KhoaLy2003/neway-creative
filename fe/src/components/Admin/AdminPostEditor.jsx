import React, { Fragment, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Input, Spin, Upload, notification } from "antd";
import { createPost, uploadImage } from "../../api/post";
import { UploadOutlined } from "@ant-design/icons";

function AdminPostEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const postCreateDto = {
    title: title,
    description: "",
    content: content,
    thumbnail: "",
  };

  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      const response = await createPost(postCreateDto);
      if (response.status === 200) {
        const postId = response.data.id;
        console.log("Post: ", response.data);
        if (imageFile) {
          await uploadImage(postId, imageFile);
        }

        setTitle("");
        setContent("");
        setImageFile(null);
        setFileName("");

        notification.success({
          message: "Create post successfully",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      notification.error({
        message: "Create post failed",
        description: error.message,
        duration: 2,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    setFileName(file.name);
    return false; // Prevents default upload behavior
  };

  return (
    <Fragment>
      <div style={{ marginBottom: 25 }}>
        <form method="POST">
          <Input
            style={{ marginBottom: 25 }}
            name="title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
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
            data={content}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={handleEditorChange}
            disabled={isLoading}
          />
          <Upload
            beforeUpload={handleImageChange}
            showUploadList={false}
            disabled={isLoading}
          >
            <Button style={{ marginTop: 25 }} icon={<UploadOutlined />}>
              Select Image
            </Button>
          </Upload>
          {fileName && (
            <div style={{ marginTop: 10 }}>
              <strong>Selected file:</strong> {fileName}
            </div>
          )}
        </form>
      </div>
      <Button
        onClick={handleCreatePost}
        type="primary"
        htmlType="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spin /> : "Create Post"}
      </Button>
    </Fragment>
  );
}

export default AdminPostEditor;

import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  Select,
  Space,
  Upload,
  Card,
  InputNumber,
  Spin,
  Image,
} from "antd";
import {
  LoadingOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { fetchCategories } from "../../api/category";
import { createCalendar, uploadCalendarImage } from "../../api/calendar";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const packageTypeOptions = [
  { value: "BASIC", label: "BASIC" },
  { value: "ADVANCED", label: "ADVANCED" },
  { value: "PREMIUM", label: "PREMIUM" },
];

const packageDurationUnitOptions = [
  { value: "DAYS", label: "DAYS" },
  { value: "WEEKS", label: "WEEKS" },
  { value: "MONTHS", label: "MONTHS" },
  { value: "YEARS", label: "YEARS" },
];

const AdminCalendarForm = () => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    if (responseStatus !== null) {
      const newPath = responseStatus ? "/admin" : "/admin/calendars/create";
      navigate("/admin/result", {
        state: {
          status: responseStatus,
          title: responseStatus ? "Success" : "Error",
          subTitle: responseStatus
            ? "Calendar created successfully."
            : "Failed to create calendar.",
          btnText: responseStatus ? "Go back to dashboard" : "Try again",
          path: newPath,
        },
      });
    }
  }, [responseStatus, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    const { title, description, category, packages } = values;

    const calendar = {
      title,
      description,
      category_id: category,
      packages: packages.map((pkg) => ({
        package_price: pkg.package_price,
        package_duration_value: pkg.package_duration_value,
        package_duration_unit: pkg.package_duration_unit,
        package_type: pkg.package_type,
        link_notion: pkg.link_notion,
      })),
    };

    try {
      const createResponse = await createCalendar(calendar);
      console.log("Backend create calendar response: ", createResponse);

      if (createResponse.status === 201) {
        console.log("Create ok", createResponse);
        const calendarId = createResponse.data;
        const formData = new FormData();
        formData.append("imageFile", file);
        formData.append("id", calendarId);

        const response = await uploadCalendarImage(calendarId, formData);
        if (response.status === 200) {
          console.log("Upload ok", response);
          setResponseStatus(true);
          form.resetFields();
        }
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      console.log(responseStatus);
      setLoading(false);
    }
  };

  return (
    // <Layout>
    //   <Space
    //     size={20}
    //     direction="vertical"
    //     style={{
    //       margin: "24px 16px 0",
    //     }}
    //   >
    //   </Space>
    // </Layout>
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="create"
        onFinish={onFinish}
        style={{
          maxWidth: 800,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input calendar title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input calendar description",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select calendar category",
            },
          ]}
        >
          <Select placeholder="select calendar category">
            {categories.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please import one calendar image",
          //     validator: (_, value) => {
          //       if (value && value.length === 1) {
          //         return Promise.resolve();
          //       }
          //       return Promise.reject(
          //         new Error("Please upload only one image")
          //       );
          //     },
          //   },
          // ]}
        >
          <Upload
            style={{ marginBottom: 20 }}
            maxCount={1}
            listType="picture-card"
            type="drag"
            name="file"
            beforeUpload={() => {
              return false;
            }}
            onChange={(event) => {
              setFile(event.file);
            }}
            onPreview={handlePreview}
          >
            <button
              style={{ border: 0, background: "none", marginBottom: 10 }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 10 }}>Upload</div>
            </button>
          </Upload>
          {/* <input type="file" name="imageFile" onChange={handleChange} /> */}
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        <FormItem
          label="Packages"
          name="package"
          dependencies={["packages"]}
          tooltip="Please add at least one package"
        >
          <Form.List
            name="packages"
            rules={[
              {
                validator: (_, value) => {
                  console.log(value.length);
                  if (value && value.length >= 1) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please add only one package")
                  );
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Package ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label="Price"
                      name={[field.name, "package_price"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input package price",
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      label="Duration"
                      name={[field.name, "package_duration_value"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input package duration",
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      label="Unit"
                      name={[field.name, "package_duration_unit"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select package duration unit",
                        },
                      ]}
                    >
                      <Select placeholder="select package duration unit">
                        {packageDurationUnitOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Type"
                      name={[field.name, "package_type"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select package type",
                        },
                      ]}
                    >
                      <Select placeholder="select package type">
                        {packageTypeOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Notion"
                      name={[field.name, "link_notion"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input notion link",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add package
                </Button>
              </div>
            )}
          </Form.List>
        </FormItem>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" ghost="true">
            Create
          </Button>
        </Form.Item>
      </Form>

      {loading && (
        <Spin
          fullscreen={true}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 40,
              }}
              spin
            />
          }
        />
      )}
    </div>
  );
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  if (e && e.fileList) {
    return e.fileList;
  }
  return [];
};

export default AdminCalendarForm;

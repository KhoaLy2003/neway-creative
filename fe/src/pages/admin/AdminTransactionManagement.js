import {
  Layout,
  Space,
  Table,
  Typography,
  Select,
  Button,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { fetchOrderHistoryAdmin } from "../../api/order";
import { updateOrder } from "../../api/payment";

// TODO:
// - Fetch api
// - Set state list with fetched data
// - Define column title
// - Set datasource

const { Option } = Select;

const AdminTransactionManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOrderHistoryAdmin();

        const ordersWithFormattedDate = data.data.orderList.map((order) => {
          const [year, month, day] = order.orderDate;
          const formattedDate = `${day}/${month}/${year}`;
          return { ...order, formattedDate };
        });

        setOrderHistory(ordersWithFormattedDate);
        setTotalElements(ordersWithFormattedDate.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleStatusChange = (orderId, selectedStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(selectedStatus);
  };

  const handleConfirm = async () => {
    const orderDto = {
      orderId: selectedOrderId,
      status: selectedStatus,
    };

    const response = await updateOrder(orderDto);
    if (response.status === 200) {
      notification.success({
        message: "Status updated success",
        duration: 2,
      });
    }
  };
  const columns = [
    // {
    //   title: "Customer ID",
    //   dataIndex: "customerId",
    //   key: "customerId",
    // },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Order Date",
      dataIndex: "formattedDate",
      key: "formattedDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {price.toLocaleString("de-DE") + " VNĐ"}
        </span>
      ),
    },
    {
      title: "Packages",
      dataIndex: "numOfPackages",
      key: "numOfPackages",
    },

    {
      title: "Status",
      key: "status",

      render: (_, record) => (
        <Select
          defaultValue={record.status}
          style={{
            width: 150,
          }}
          onChange={(selectedStatus) =>
            handleStatusChange(record.orderId, selectedStatus)
          }
        >
          <Option value="COMPLETED" style={{ color: "green" }}>
            Completed
          </Option>
          <Option value="CANCELLED" style={{ color: "red" }}>
            Cancelled
          </Option>
          <Option value="PENDING" style={{ color: "blue" }}>
            Pending
          </Option>
          <Option value="WAITING" style={{ color: "black" }}>
            Waiting
          </Option>
          <Option value="FAILED" style={{ color: "red" }}>
            Failed
          </Option>
        </Select>
      ),
    },
    {
      title: "Action",
      render: () => (
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      ),
    },
  ];
  return (
    <Layout>
      <Space
        size={20}
        direction="vertical"
        style={{
          width: "95%",
          margin: "0 auto",
        }}
      >
        <Typography.Title level={2} style={{ marginTop: "30px" }}>
          Order history
        </Typography.Title>
        <Table
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            total: totalElements,
            showSizeChanger: false,
            pageSize: 8,
          }}
          dataSource={orderHistory}
          loading={isLoading}
          onChange={(pagination) => setCurrentPage(pagination.current - 1)}
        />
      </Space>
    </Layout>
  );
};

export default AdminTransactionManagement;

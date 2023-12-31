import { SearchOutlined } from "@ant-design/icons";
import { Button, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { apiDeleteshop, apiGetShops, apiUpdateStatusShop } from "../../api";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./style";
import { optionStatusShop } from '../../contanst'
import { toast } from "react-toastify";
function AdminShops() {
  const [shop, setShop] = useState(null);
  const searchInput = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const fetchShops = async () => {
    const response = await apiGetShops();
    if (response.err === 0) {
      setShop(response?.shopData);
    }
  };
  useEffect(() => {
    fetchShops();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const handleDelteManyUsers = async (ids) => {
    await Promise.all(ids.map(async (el) => {
      await apiDeleteshop(el);
    }))
    toast.success('xóa thành công')
    fetchShops();
  }
  const columns = [
    {
      title: "Shop name",
      dataIndex: "shop_name",
      sorter: (a, b) => a.shop_name.length - b.shop_name.length,
      ...getColumnSearchProps("shop_name"),
    },
    {
      title: "Image shop",
      dataIndex: "Image_shop",
    },
    {
      title: "Address",
      dataIndex: "Address",
      sorter: (a, b) => a.Address.length - b.Address.length,
      ...getColumnSearchProps("Address"),
    },
    {
      title: "Kind shop",
      dataIndex: "kind_shop",
      sorter: (a, b) => a.kind_shop.length - b.kind_shop.length,
      ...getColumnSearchProps("kind_shop"),
    },
    {
      title: "User Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name - b.Name,
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      // render: renderAction
    },
  ];
  const handleOnchangeSelectStatus = (value, shopId) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [shopId]: value,
    }));
  }
  const handleUpdate = async (key) => {
    if (selectedStatus[key]) {
      const response = await apiUpdateStatusShop({ status: selectedStatus[key] }, key)
      if (response.err === 0) {
        toast.success(response.mes)
        fetchShops()
      }
    } else {
      toast.warning('không có thay dổi')
    }
  }
  const dataTable =
    shop?.rows?.length > 0 &&
    shop?.rows?.map((shopValue) => {
      return {
        ...shopValue,
        key: shopValue.id,
        Name: shopValue.User.Name,
        Image_shop: <img style={{ width: '50px', height: '50px' }} src={shopValue.Image_shop && `http://localhost:5000/images/${shopValue.Image_shop}`} alt="" />,
        status: (
          <Select
            style={{ width: "100%" }}
            onChange={(value) => handleOnchangeSelectStatus(value, shopValue.id)}
            defaultValue={shopValue.status}
            options={optionStatusShop}
          />
        ),
        action: (
          <ButtonComponent
            textbutton={"Cập nhật"}
            onClick={() => handleUpdate(shopValue.id)}
          />
        ),
      };
    });
  return (
    <div>
      <WrapperHeader>Quản lý shop</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDelteMany={handleDelteManyUsers}
          data={dataTable}
          columns={columns}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default AdminShops;

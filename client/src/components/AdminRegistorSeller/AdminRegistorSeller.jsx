import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { apiCreateShop, apiDeleteRegistorSellers, apiGetRegistorSellers, apiUpdateUsers } from '../../api'
import { Button, Select, Space } from 'antd'
import { useRef } from 'react'
import { CheckOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import Swal from "sweetalert2";
import { toast } from 'react-toastify'
function AdminRegistorSeller() {

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [registorSeller, setRegistorSeller] = useState(null)
    const searchInput = useRef(null);
    const fetchRegistorSellers = async () => {
        const response = await apiGetRegistorSellers()
        if (response.err === 0) {
            setRegistorSeller(response?.registorSellerData)
        }
    }
    useEffect(() => {
        fetchRegistorSellers()
    }, [])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
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
                    color: filtered ? '#1890ff' : undefined,
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
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDelteManyUsers = async (ids) => {

    }
    const handleDeleteUser = () => {

    }
    const columns = [
        {
            title: 'Shop name',
            dataIndex: 'shop_name',
            sorter: (a, b) => a.shop_name.length - b.shop_name.length,
            ...getColumnSearchProps('shop_name')
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            sorter: (a, b) => a.Address.length - b.Address.length,
            ...getColumnSearchProps('Address')
        },
        {
            title: 'Kind shop',
            dataIndex: 'kind_shop',
            sorter: (a, b) => a.kind_shop.length - b.kind_shop.length,
            ...getColumnSearchProps('kind_shop')
        },
        {
            title: 'User Name',
            dataIndex: 'Name',
            sorter: (a, b) => a.Name - b.Name,
            ...getColumnSearchProps('Name')
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            sorter: (a, b) => a.reason - b.reason,
            ...getColumnSearchProps('reason')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // render: renderAction
        },
    ];
    const handleBrowseApplication = (registorSeller) => {
        Swal.fire({
            title: "Are you sure",
            text: "Are you sure you want to browse this application",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiCreateShop({
                    shop_name: registorSeller.shop_name,
                    Address: registorSeller.Address,
                    kind_shop: registorSeller.kind_shop,
                    id_user: registorSeller.id_user
                });
                if (response.err === 0) {
                    const updateRole = await apiUpdateUsers({ role: '2' }, registorSeller.id_user)
                    const deleteRegistorSeller = await apiDeleteRegistorSellers(registorSeller.idregistor_seller);
                    if (deleteRegistorSeller.err === 0 && updateRole.err === 0) {
                        toast.success(response.mes);
                        fetchRegistorSellers()
                    }
                } else {
                    toast.error(response.mes);
                }
            }
        });
    }
    const handleDeleteRegistorSeller = (rsid) => {
        Swal.fire({
            title: "Are you sure",
            text: "Are you sure remove this application",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteRegistorSellers(rsid);
                if (response.err === 0) {
                    toast.success(response.mes);
                    fetchRegistorSellers()
                } else {
                    toast.error(response.mes);
                }
            }
        });
    }
    const dataTable = registorSeller?.rows?.length > 0 && registorSeller?.rows?.map((registorSeller) => {
        return {
            ...registorSeller, key: registorSeller.idregistor_seller, Name: registorSeller.User.Name,
            action: <div>
                <CheckOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleBrowseApplication(registorSeller)} />
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleDeleteRegistorSeller(registorSeller.idregistor_seller)} />
            </div>
        }
    })
    return (
        <div>
            <WrapperHeader>Xét duyệt đơn đăng ký</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyUsers}
                    data={dataTable} columns={columns}
                    isLoading={false} />
            </div>
        </div>
    )
}

export default AdminRegistorSeller
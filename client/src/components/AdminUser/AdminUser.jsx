import { Button, Form, Space, Select } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { getUsers } from '../../store/user/asyncActions'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { optionRoles } from '../../contanst'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { apiDeleteUsers, apiUpdateUsers } from '../../api'
import { toast } from 'react-toastify'
const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [selectedRole, setSelectedRole] = useState({});
    const { usersData } = useSelector((state) => state.user);
    const searchInput = useRef(null);
    const dispatch = useDispatch()

    const [stateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })

    const [form] = Form.useForm();

    const handleDelteManyUsers = async (ids) => {
        await Promise.all(ids.map(async (el) => {
            await apiDeleteUsers(el);
        }))
        dispatch(getUsers())
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
        }
    }, [rowSelected, isOpenDrawer])





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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            sorter: (a, b) => a.Name.length - b.Name.length,
            ...getColumnSearchProps('Name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            ...getColumnSearchProps('Address')
        },
        {
            title: 'Role',
            dataIndex: 'role',

        },
        {
            title: 'Phone',
            dataIndex: 'SDT',
            sorter: (a, b) => a.SDT - b.SDT,
            ...getColumnSearchProps('SDT')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // render: renderAction
        },
    ];
    const handleOnchangeSelectRole = (value, userId) => {
        setSelectedRole((prevSelectedRole) => ({
            ...prevSelectedRole,
            [userId]: value,
        }));
    }
    const handleUpdate = async (key) => {
        if (selectedRole[key]) {
            const response = await apiUpdateUsers({ role: selectedRole[key] }, key)
            if (response.err === 0) {
                toast.success(response.mes)
                dispatch(getUsers)
            }
        } else {
            toast.warning('không có thây dổi')
        }
    }
    const dataTable = usersData?.length > 0 && usersData?.map((user) => {
        return {
            ...user, key: user.id,
            role: user.role === '1' ? 'Admin' : <Select style={{ width: '100%' }} onChange={(value) => handleOnchangeSelectRole(value, user.id)} defaultValue={user.role} options={optionRoles} />,
            action: user.role !== '1' && <ButtonComponent textbutton={'Cập nhật'} onClick={() => handleUpdate(user.id)} />
        }
    })
    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyUsers} data={dataTable} columns={columns} isLoading={false} />
            </div>
        </div>
    )
}

export default AdminUser
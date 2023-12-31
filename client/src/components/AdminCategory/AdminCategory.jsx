import { Button, Form, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent';
import { WrapperHeader, WrapperUploadFile } from './style';
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { getBase64 } from '../../utils';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { apiCreateCategory, apiDeleteCategory, apiGetCategorys, apiUpdateCategorys } from '../../api/category';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const AdminCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const inittial = () => ({
        category_name: '',
        image: ''
    })
    const [stateCategory, setStateCategory] = useState(inittial())
    const [imageCategory, setImageCategory] = useState()
    const [idCategory, setidCategory] = useState()
    const [stateCategoryDetails, setStateCategoryDetails] = useState(inittial())
    const [categoryDetail, setCategoryDetail] = useState()
    const [categorys, setCategorys] = useState()
    const searchInput = useRef(null);
    const [formModal] = Form.useForm();
    const [formDrawer] = Form.useForm();
    const [rowSelected, setRowSelected] = useState('')

    const fetchCategory = async (params) => {
        if (params) {
            const response = await apiGetCategorys({ id: params })
            if (response.err === 0) {
                setStateCategoryDetails({
                    category_name: response?.categoryData?.rows[0]?.category_name,
                    image: response?.categoryData?.rows[0]?.category_image,

                })
                setCategoryDetail({ category_image: `http://localhost:5000/images/${response?.categoryData?.rows[0]?.category_image}` })
            }

        } else {
            const response = await apiGetCategorys()
            if (response.err === 0) {
                setCategorys(response?.categoryData)

            }
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])
    const handleDelteManyCategorys = async (ids) => {
        await Promise.all(ids.map(async (el) => {
            await apiDeleteCategory(el);
        }))
        toast.success('xóa thành công')
        fetchCategory();
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const handleOnchange = (e) => {
        setStateCategory({
            ...stateCategory,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatar = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImageCategory({ category_image: file.preview })
        setStateCategory({
            ...stateCategory,
            image: data.file.originFileObj
        })
    }
    const handleOnchangeAvatarDetails = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setCategoryDetail({ category_image: file.preview })
        setStateCategoryDetails({
            ...stateCategoryDetails,
            image: data.file.originFileObj
        })
    }
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
    const handleDeleteCategory = (cid) => {
        Swal.fire({
            title: "Are you sure",
            text: "Are you sure remove this application",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteCategory(cid);
                if (response.err === 0) {
                    toast.success(response.mes);
                    fetchCategory()
                } else {
                    toast.error(response.mes);
                }
            }
        });
    }
    const onFinish = async () => {
        const formData = new FormData();
        for (const key in stateCategory) {
            if (stateCategory.hasOwnProperty(key)) {
                if (stateCategory[key] instanceof File) {
                    formData.append(key, stateCategory[key]);
                } else {
                    formData.append(key, stateCategory[key]);
                }
            }
        }
        const response = await apiCreateCategory(formData);
        if (response.err === 0) {
            toast.success(response.mes);
            fetchCategory()
            handleCancel()
            setIsModalOpenDelete(false)
        } else {
            toast.error(response.mes);
        }
    }

    const columns = [
        {
            title: 'Category name',
            dataIndex: 'category_name',
            sorter: (a, b) => a.category_name.length - b.category_name.length,
            ...getColumnSearchProps('category_name')
        },
        {
            title: "Category image",
            dataIndex: "category_image",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // render: renderAction
        },
    ];
    const handleDetailsCategory = (cid) => {
        setIsOpenDrawer(true)
        fetchCategory(cid)
        setidCategory(cid)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateCategory({
            category_name: '',
            category_image: ''
        })
        setImageCategory()
        setidCategory()
        formModal.resetFields()
        formDrawer.resetFields()

    };
    const dataTable = categorys?.rows?.length > 0 && categorys?.rows?.map((category) => {
        return {
            ...category, key: category.id, category_image: < img style={{ width: '50px', height: '50px' }} src={category.category_image && `http://localhost:5000/images/${category.category_image}`} alt="" />,
            action: <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => handleDeleteCategory(category.id)}
                />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => handleDetailsCategory(category.id)}
                />
            </div>


        }
    })
    const onUpdateProduct = async () => {
        const formData = new FormData();

        for (const key in stateCategoryDetails) {
            if (stateCategoryDetails.hasOwnProperty(key)) {
                if (stateCategory[key] instanceof File) {
                    formData.append(key, stateCategoryDetails[key]);
                } else {
                    formData.append(key, stateCategoryDetails[key]);
                }
            }
        }
        const response = await apiUpdateCategorys(formData, idCategory);
        if (response.err === 0) {
            toast.success(response.mes);
            fetchCategory()
            handleCancel()
            setIsOpenDrawer(false)
        } else {
            toast.error(response.mes);
        }
    }
    const handleOnchangeDetails = (e) => {
        setStateCategoryDetails({
            ...stateCategoryDetails,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (!isModalOpen) {
            formDrawer.setFieldsValue(stateCategoryDetails)
        } else {
            formDrawer.setFieldsValue(inittial())
        }
    }, [formDrawer, stateCategoryDetails, isModalOpen])

    return (
        <div>
            <WrapperHeader>Quản lý danh mục</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDelteMany={handleDelteManyCategorys} columns={columns} isLoading={false}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        };
                    }} />
            </div>
            <ModalComponent forceRender title="Tạo danh mục" open={isModalOpen} onCancel={handleCancel} footer={null} >
                <Loading isLoading={false}>

                    <Form
                        name="form1"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        form={formModal}
                    >
                        <Form.Item
                            label="Category name"
                            name="category_name"
                            rules={[{ required: true, message: 'Please input your category name!' }]}
                        >
                            <InputComponent value={stateCategory['category_name']}
                                onChange={handleOnchange}
                                name="category_name" />
                        </Form.Item>


                        <Form.Item
                            label="Image"
                            name="category_image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}>
                                <Button >Select File</Button>
                                {imageCategory?.category_image && (
                                    <img src={imageCategory?.category_image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={false}>

                    <Form
                        name="form2"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateProduct}
                        autoComplete="on"
                        form={formDrawer}
                    >
                        <Form.Item
                            label="Category name"
                            name="category_name"
                            rules={[{ required: true, message: 'Please input category name!' }]}
                        >
                            <InputComponent
                                onChange={handleOnchangeDetails}
                                name="category_name"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="category_image"
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatarDetails}
                                maxCount={1}
                            >
                                <Button>Select File</Button>
                                {categoryDetail?.category_image && (
                                    <img src={categoryDetail?.category_image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
        </div>
    )
}

export default AdminCategory
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
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { apiCreateProduct, apiDeleteProduct, apiGetProducts, apiUpdateProducts } from '../../api/product';
import { useSelector, useDispatch } from 'react-redux'

function SellerProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const { current } = useSelector((state) => state.user);
    const { newCategorys } = useSelector((state) => state.categorys);
    const dispatch = useDispatch()
    const inittial = () => ({
        product_name: '',
        image: '',
        product_decs: '',
        product_price: '',
        category_id: '',
        product_numbersell: '',
        id_shop: ''
    })
    const [stateProduct, setStateProduct] = useState(inittial())
    const [imageProduct, setImageProduct] = useState()
    const [idProduct, setidProduct] = useState()
    const [stateProductDetails, setStateProductDetails] = useState(inittial())
    const [productDetail, setProductDetail] = useState()
    const [products, setProducts] = useState()
    const searchInput = useRef(null);
    const [formModal] = Form.useForm();
    const [formDrawer] = Form.useForm();
    const [rowSelected, setRowSelected] = useState('')
    const [optionCategory, setOptionCategory] = useState([]);
    useEffect(() => {
        setOptionCategory([])
        if (newCategorys?.rows?.length > 0) {
            const newOptions = newCategorys.rows.map((e) => ({
                value: e.id,
                label: e.category_name
            }));
            setOptionCategory((prevOptions) => [...prevOptions, ...newOptions]);
        }
    }, [newCategorys]);

    const fetchProduct = async (params) => {
        if (params) {
            const response = await apiGetProducts({ id: params, id_shop: current.shop.id })
            if (response.err === 0) {
                setStateProductDetails({
                    product_name: response?.productData?.rows[0]?.product_name,
                    image: response?.productData?.rows[0]?.product_image,
                    product_decs: response?.productData?.rows[0]?.product_decs,
                    product_price: response?.productData?.rows[0]?.product_price,
                    category_id: response?.productData?.rows[0]?.category_id,
                    product_numbersell: response?.productData?.rows[0]?.product_numbersell,
                    id_shop: response?.productData?.rows[0]?.id_shop

                })
                setProductDetail({ product_image: `http://localhost:5000/images/${response?.productData?.rows[0]?.product_image}` })
            }

        } else {
            const response = await apiGetProducts()
            if (response.err === 0) {
                setProducts(response?.productData)

            }
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const handleDelteManyProduct = async (ids) => {
        await Promise.all(ids.map(async (el) => {
            await apiDeleteProduct(el);
        }))
        toast.success('xóa thành công')
        fetchProduct();
    }
    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: "Are you sure",
            text: "Are you sure remove this application",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.err === 0) {
                    toast.success(response.mes);
                    fetchProduct()
                } else {
                    toast.error(response.mes);
                }
            }
        });
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
    const columns = [
        {
            title: 'Product name',
            dataIndex: 'product_name',
            sorter: (a, b) => a.product_name.length - b.product_name.length,
            ...getColumnSearchProps('product_name')
        },
        {
            title: "Product image",
            dataIndex: "product_image",
        },
        {
            title: 'Price',
            dataIndex: 'product_price',
            sorter: (a, b) => a.product_price.length - b.product_price.length,
            ...getColumnSearchProps('product_price')
        },
        {
            title: 'Description',
            dataIndex: 'product_decs',
            ...getColumnSearchProps('product_decs')
        },
        {
            title: 'Amount',
            dataIndex: 'product_numbersell',
            sorter: (a, b) => a.product_numbersell.length - b.product_numbersell.length,
        },
        {
            title: 'Product selled',
            dataIndex: 'product_selled',
            sorter: (a, b) => a.product_selled.length - b.product_selled.length,
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            ...getColumnSearchProps('product_review')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // render: renderAction
        },
    ];
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            product_name: '',
            image: '',
            product_decs: '',
            product_price: '',
            category_id: '',
            id_shop: ''
        })
        setImageProduct()
        setidProduct()
        formModal.resetFields()
        formDrawer.resetFields()

    };
    const handleOnchangeAvatar = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImageProduct({ product_image: file.preview })
        setStateProduct({
            ...stateProduct,
            image: data.file.originFileObj
        })
    }
    const handleOnchangeAvatarDetails = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setProductDetail({ product_image: file.preview })
        setStateProductDetails({
            ...stateProductDetails,
            image: data.file.originFileObj
        })
    }
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleDetailsProduct = (pid) => {
        setIsOpenDrawer(true)
        fetchProduct(pid)
        setidProduct(pid)
    }


    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            category_id: value
        })
    }
    const dataTable = products?.rows?.length > 0 && products?.rows?.map((product) => {
        return {
            ...product, key: product.id, product_image: < img style={{ width: '50px', height: '50px' }} src={product.product_image && `http://localhost:5000/images/${product.product_image}`} alt="" />,
            Category: product.category.category_name,
            action: <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => handleDeleteProduct(product.id)}
                />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => handleDetailsProduct(product.id)}
                />
            </div>


        }
    })
    const onFinish = async () => {
        stateProduct.id_shop = current?.shop?.id
        console.log(stateProduct)
        const formData = new FormData();
        for (const key in stateProduct) {
            if (stateProduct.hasOwnProperty(key)) {
                if (stateProduct[key] instanceof File) {
                    formData.append(key, stateProduct[key]);
                } else {
                    formData.append(key, stateProduct[key]);
                }
            }
        }
        const response = await apiCreateProduct(formData);
        if (response.err === 0) {
            toast.success(response.mes);
            fetchProduct()
            handleCancel()
            setIsModalOpenDelete(false)
        } else {
            toast.error(response.mes);
        }
    }
    const onUpdateProduct = async () => {
        stateProductDetails.id_shop = current?.shop?.id
        const formData = new FormData();

        for (const key in stateProductDetails) {
            if (stateProductDetails.hasOwnProperty(key)) {
                if (stateProductDetails[key] instanceof File) {
                    formData.append(key, stateProductDetails[key]);
                } else {
                    formData.append(key, stateProductDetails[key]);
                }
            }
        }
        const response = await apiUpdateProducts(formData, idProduct);
        if (response.err === 0) {
            toast.success(response.mes);
            fetchProduct()
            handleCancel()
            setIsOpenDrawer(false)
        } else {
            toast.error(response.mes);
        }
    }
    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (!isModalOpen) {
            formDrawer.setFieldsValue(stateProductDetails)
        } else {
            formDrawer.setFieldsValue(inittial())
        }
    }, [formDrawer, stateProductDetails, isModalOpen])

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    handleDelteMany={handleDelteManyProduct}
                    columns={columns} isLoading={false}
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
                            label="Product name"
                            name="product_name"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <InputComponent value={stateProduct['product_name']}
                                onChange={handleOnchange}
                                name="product_name" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="product_price"
                            rules={[{ required: true, message: 'Please input your product price!' }]}
                        >
                            <InputComponent value={stateProduct['product_price']}
                                onChange={handleOnchange}
                                name="product_price" />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="product_numbersell"
                            rules={[{ required: true, message: 'Please input your product number sell!' }]}
                        >
                            <InputComponent value={stateProduct['product_numbersell']}
                                onChange={handleOnchange}
                                name="product_numbersell"
                                type='number' />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category_id"
                            rules={[{ required: true, message: 'Please input your category!' }]}
                        >
                            <Select
                                name="category_id"
                                value={stateProduct.category_id}
                                onChange={handleChangeSelect}
                                options={optionCategory}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="product_decs"
                            rules={[{ required: true, message: 'Please input your category description!' }]}
                        >
                            <InputComponent value={stateProduct['product_decs']}
                                onChange={handleOnchange}
                                name="product_decs" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="product_image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}>
                                <Button >Select File</Button>
                                {imageProduct?.product_image && (
                                    <img src={imageProduct?.product_image} style={{
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
                            label="Product name"
                            name="product_name"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <InputComponent value={stateProduct['product_name']}
                                onChange={handleOnchangeDetails}
                                name="product_name" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="product_price"
                            rules={[{ required: true, message: 'Please input your product price!' }]}
                        >
                            <InputComponent value={stateProduct['product_price']}
                                onChange={handleOnchangeDetails}
                                name="product_price" />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="product_numbersell"
                            rules={[{ required: true, message: 'Please input your product number sell!' }]}
                        >
                            <InputComponent value={stateProduct['product_numbersell']}
                                onChange={handleOnchangeDetails}
                                name="product_numbersell"
                                type='number' />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category_id"
                            rules={[{ required: true, message: 'Please input your category!' }]}
                        >
                            <Select
                                name="category_id"
                                value={stateProduct.category_id}
                                onChange={handleChangeSelect}
                                options={optionCategory}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="product_decs"
                            rules={[{ required: true, message: 'Please input your category description!' }]}
                        >
                            <InputComponent value={stateProduct['product_decs']}
                                onChange={handleOnchangeDetails}
                                name="product_decs" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="product_image"
                        // rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatarDetails}
                                maxCount={1}>
                                <Button >Select File</Button>
                                {productDetail?.product_image && (
                                    <img src={productDetail?.product_image} style={{
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
            </DrawerComponent>
        </div>
    )
}

export default SellerProduct
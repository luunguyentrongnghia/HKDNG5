import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, CheckCircleOutlined, ShopOutlined, BarsOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderCompoent/HeaderCompoent';
import AdminUser from '../../components/AdminUser/AdminUser';
import RegistorSeller from '../../components/AdminRegistorSeller/AdminRegistorSeller'
import AdminShops from '../../components/AdminShops/AdminShops'
import AdminCategory from '../../components/AdminCategory/AdminCategory'

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Duyệt Đơn Đăng ký', 'registorSeller', <CheckCircleOutlined />),
        getItem('Shop', 'shop', <ShopOutlined />),
        getItem('Danh mục sản phẩm', 'category', <BarsOutlined />),
        getItem('Sản phẩm', 'products', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),

    ];
    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return (
                    <AdminUser />
                )
            case 'registorSeller':
                return (
                    <RegistorSeller />
                )
            case 'shop':
                return (
                    <AdminShops />
                )
            case 'category':
                return (
                    <AdminCategory />
                )
            // case 'products':
            //     return (
            //         <AdminProduct />
            //     )
            // case 'orders':
            //     return (
            //         <OrderAdmin />
            //     )
            default:
                return <></>
        }
    }

    const handleOnCLick = ({ key }) => {
        setKeySelected(key)
    }
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage
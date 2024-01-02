import { Menu } from 'antd'
import React, { useState } from 'react'
import HeaderComponent from '../../components/HeaderCompoent/HeaderCompoent'
import { getItem } from '../../utils';
import SellerShopInformation from '../../components/SellerShopInformation/SellerShopInformation'
import SellerProduct from '../../components/SellerProduct/SellerProduct'
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, CheckCircleOutlined, ShopOutlined } from '@ant-design/icons'
function SellerPage() {
    const [keySelected, setKeySelected] = useState('');
    const items = [
        getItem('Thông tin Shop', 'shop', <ShopOutlined />),
        getItem('Sản phẩm', 'products', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),

    ];
    const renderPage = (key) => {
        switch (key) {
            case 'shop':
                return (
                    <SellerShopInformation />
                )
            // case 'registorSeller':
            //     return (
            //         <RegistorSeller />
            //     )
            // case 'shop':
            //     return (
            //         <AdminShops />
            //     )
            case 'products':
                return (
                    <SellerProduct />
                )
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

export default SellerPage
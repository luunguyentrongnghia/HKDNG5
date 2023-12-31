import { Badge, Button, Col, Popover } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import * as UserService from '../../services/UserService'
// import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
// import { searchProduct } from '../../redux/slides/productSlide';
import { getCurrent } from "../../store/user/asyncActions";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from 'sweetalert2';
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const { isLoggedIn, current, mess } = useSelector((state) => state.user);
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    useEffect(() => {
        const setTimeoutId = setTimeout(async () => {
            if (isLoggedIn) {
                dispatch(getCurrent());
            }
        }, 300);
        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [dispatch, isLoggedIn]);
    const handleLogout = async () => {
        setLoading(true)
        // await UserService.logoutUser()
        // dispatch(resetUser())
        setLoading(false)
    }
    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            {+current?.role === 1 && (

                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            {+current?.role === 2 && (

                <WrapperContentPopup onClick={() => handleClickNavigate('seller')}>Quản lí cửa hàng</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => dispatch(logout())}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'seller') {
            navigate('/system/seller')
        }
        setIsOpenPopup(false)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        // dispatch(searchProduct(e.target.value))
    }

    return (
        <div style={{ heiht: '100%', width: '100%', display: 'flex', background: '#9255FD', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader to='/'>SHOP</WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButttonInputSearch
                            size="large"
                            bordered={false}
                            textbutton="Tìm kiếm"
                            placeholder="input search text"
                            onChange={onSearch}
                            backgroundColorButton="#5a20c1"
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccout>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {isLoggedIn && current ? (
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{` ${current?.Name}`}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccout>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import InputSelect from '../../components/InputSelect/InputSelect'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperAvatar, WrapperUploadFile } from './style'
import Loading from '../../components/LoadingComponent/Loading'
import { Button, Upload } from 'antd'
import { apiUpdateCurrent } from '../../api'
import { toast } from 'react-toastify'
import { getCurrent, getUsers } from "../../store/user/asyncActions";
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'
import clsx from 'clsx'
import { selectKind } from '../../contanst'
import { apiCreateRegistorSeller } from '../../api';
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'
const ProfilePage = () => {
    const { current } = useSelector((state) => state.user);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [nameShop, setNameShop] = useState()
    const [AddressShop, setAddressShop] = useState()
    const [kindShop, setKindShop] = useState()
    const [reason, setReason] = useState()
    const [phone, setPhone] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarImg, setAvatarImg] = useState('')
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        setEmail(current?.email)
        setName(current?.Name)
        setPhone(current?.SDT)
        setAddress(current?.Address)
        setAvatar(`http://localhost:5000/images/${current?.imgUS}`);
    }, [current])
    console.log(avatar)
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAddressShop = (value) => {
        setAddressShop(value)
    }
    const handleOnchangeNameShop = (value) => {
        setNameShop(value)
    }
    const handleOnchangeKindShop = (value) => {
        setKindShop(value)
    }
    const handleOnchangeReason = (value) => {
        setReason(value)
    }
    const handleOnchangeAvatar = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatarImg(data.file.originFileObj)
        setAvatar(file.preview)
    }
    const handleRegister = () => {
        setIsOpenDrawer(true)
    }
    const handleUpdate = async (value, key) => {
        const formData = new FormData();
        formData.append(key, value);
        const response = await apiUpdateCurrent(formData);
        setLoading(true)
        if (response.err === 0) {
            dispatch(getCurrent());
            setLoading(false)
            toast.success(response.mes);
        } else {
            setLoading(false)
            toast.error(response.mes);
        }

    }
    const handleClearRegistor = () => {
        setAddressShop()
        setKindShop()
        setNameShop()
        setReason()
    }
    const handleRegistorSeller = async () => {
        setLoading(true)
        const response = await apiCreateRegistorSeller({ shop_name: nameShop, reason, Address: AddressShop, kind_shop: kindShop });
        if (response.err === 0) {
            setLoading(false)
            toast.success(response.mes);
            setAddressShop()
            setKindShop()
            setNameShop()
            setReason()
            dispatch(getCurrent())
        } else {
            toast.error(response.mes);
            setLoading(false)
        }
        setIsOpenDrawer(false)
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={loading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={() => handleUpdate(name, 'Name')}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={() => handleUpdate(email, 'email')}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={() => handleUpdate(phone, 'SDT')}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>

                        <WrapperAvatar style={{ width: '300px' }} >
                            {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} showUploadList={false} >
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </WrapperUploadFile>
                            {avatar && (
                                <img src={avatar} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} alt="avatar" />
                            )}</WrapperAvatar>

                        <ButtonComponent
                            onClick={() => handleUpdate(avatarImg, 'image')}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={() => handleUpdate(address, 'Address')}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
                <div style={{ height: '20px' }}></div>
                <WrapperContentProfile>
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '15px', justifyContent: 'space-between' }}>
                        {+current?.role === 3 && <>
                            <span style={{ color: '#000', fontSize: '12px', fontWeight: 600 }}>Đăng ký để trở thành người bán hàng:</span>
                            {current?.registorSeller === null ?
                                <Button style={{ background: '#ff1e00', color: 'white' }} onClick={handleRegister}>Đăng ký</Button>
                                : <Button disabled>Đã đăng ký</Button>
                            }


                        </>}
                        {+current?.role === 2 && <>
                            <span style={{ color: '#000', fontSize: '12px', fontWeight: 600, width: '30%' }}>Tên cửa hàng:</span>
                            <div style={{ width: '70%', display: 'flex', justifyContent: 'center' }}><span>{current?.shop?.shop_name}</span></div>
                        </>}
                        {+current?.role === 1 && <>
                            <span style={{ color: '#000', fontSize: '12px', fontWeight: 600, width: '30%' }}>Role:</span>
                            <div style={{ width: '70%', display: 'flex', justifyContent: 'center' }}><span>Admin</span></div>
                        </>}
                    </div>
                </WrapperContentProfile>
            </Loading>
            <DrawerComponent title='Đăng ký trở thành người bán hàng' isOpen={isOpenDrawer} width="50%" onClose={() => setIsOpenDrawer(false)}>
                <InputForm style={{ marginBottom: '40px' }} placeholder="Name shop" onChange={handleOnchangeNameShop} value={nameShop} />
                <InputForm style={{ marginBottom: '40px' }} placeholder="Adress" options={selectKind} onChange={handleOnchangeAddressShop} value={AddressShop} />
                <InputSelect style={{ marginBottom: '40px', width: '100%' }} placeholder="Kind shop" options={selectKind} onChange={handleOnchangeKindShop} value={kindShop} />
                <textarea
                    style={{ marginBottom: '40px' }}
                    placeholder="Reason"
                    rows="15"
                    cols="88"
                    onChange={(e) => handleOnchangeReason(e.target.value)}
                />
                <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 10 }}>
                    <ButtonComponent styleButton={{ background: 'gray', color: 'white' }} textbutton={'Hủy'} onClick={handleClearRegistor} />
                    <ButtonComponent styleButton={{ background: '#ff1e00', color: 'white' }} textbutton={'Đăng ký'} onClick={handleRegistorSeller} disabled={!nameShop?.length || !AddressShop?.length || !kindShop?.length || !reason?.length} />
                </div>
            </DrawerComponent>
        </div>
    )
}

export default ProfilePage
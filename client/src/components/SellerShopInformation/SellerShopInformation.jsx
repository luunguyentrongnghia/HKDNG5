import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiUpdateShop } from '../../api';
import { selectKind } from '../../contanst';
import { getCurrent } from '../../store/user/asyncActions';
import { getBase64 } from '../../utils';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import InputForm from '../InputForm/InputForm'
import InputSelect from '../InputSelect/InputSelect';
import { WrapperContent, WrapperHeader, WrapperImage, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'

function SellerShopInformation() {
    const { current } = useSelector((state) => state.user);
    const [shopName, setShopName] = useState()
    const [address, setAddress] = useState()
    const [imageShop, setImageShop] = useState()
    const [imgShop, setImgShop] = useState()
    const [kindShop, setKindShop] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        setAddress(current?.shop?.Address)
        setKindShop(current?.shop?.kind_shop)
        setShopName(current?.shop?.shop_name)
        setImgShop(`http://localhost:5000/images/${current?.shop?.Image_shop}`);
    }, [current])
    const handleOnchangeKindShop = (value) => {
        setKindShop(value)
    }
    const handleOnchangeShopName = (value) => {
        setShopName(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeImageShop = async (data) => {
        const file = data.fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImageShop(data.file.originFileObj)
        setImgShop(file.preview)
    }
    const handleUpdate = async (value, key) => {
        // mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        const formData = new FormData();
        formData.append(key, value);
        const response = await apiUpdateShop(formData, current?.shop?.id);
        if (response.err === 0) {
            dispatch(getCurrent());
            toast.success(response.mes);
        } else {
            toast.error(response.mes);
        }

    }
    return (
        <div>
            <WrapperHeader>Quản lý shop</WrapperHeader>
            <WrapperContent>
                <WrapperInput>
                    <WrapperLabel htmlFor="shop_name">ShopName</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id="shop_name"
                        value={shopName}
                        onChange={handleOnchangeShopName}
                    />
                    <ButtonComponent
                        onClick={() => handleUpdate(shopName, 'shop_name')}
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
                    <WrapperLabel htmlFor="Image_shop">ImageShop</WrapperLabel>

                    <WrapperImage style={{ width: '300px' }}>
                        <WrapperUploadFile onChange={handleOnchangeImageShop} maxCount={1} showUploadList={false} >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {imgShop && (
                            <img src={imgShop} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar" />
                        )}
                    </WrapperImage>

                    <ButtonComponent
                        onClick={() => handleUpdate(imageShop, 'image')}
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
                    <WrapperLabel htmlFor="Address">Address</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id="Address"
                        value={address}
                        onChange={handleOnchangeAddress}
                    />
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
                <WrapperInput>
                    <WrapperLabel htmlFor="kind_shop">Kind shop</WrapperLabel>
                    <InputSelect style={{ width: '300px' }} id='kind_shop' placeholder="Kind shop" options={selectKind} onChange={handleOnchangeKindShop} value={kindShop} />
                    <ButtonComponent
                        onClick={() => handleUpdate(kindShop, 'kind_shop')}
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
                    <WrapperLabel htmlFor="status">Status:</WrapperLabel>
                    <div style={{ width: '70%', display: 'flex', justifyContent: 'center' }}><span style={{ fontWeight: 600 }}>{current?.shop?.status === '1' ? 'Open' : 'Lock'}</span></div>
                </WrapperInput>
            </WrapperContent>
        </div>
    )
}

export default SellerShopInformation
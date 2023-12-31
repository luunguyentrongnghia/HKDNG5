import { Image } from 'antd';
import React from 'react';
import { WrapperSliderStyle } from './style';

const SliderComponent = ({ arrImages }) => {
    if (!arrImages || !Array.isArray(arrImages) || arrImages.length === 0) {
        // Trả về null hoặc hiển thị thông báo nếu arrImages không hợp lệ
        return null;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };

    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => (
                <Image key={image} src={image} alt="slider" preview={false} width="100%" height="274px" />
            ))}
        </WrapperSliderStyle>
    );
};

export default SliderComponent;

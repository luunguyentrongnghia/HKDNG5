import React, { memo } from "react";
import { WrapperSelectStyle } from './style'
const InputSelect = (props) => {
    const { placeholder = '', ...rests } = props
    const handleOnchangeSelect = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <WrapperSelectStyle onChange={handleOnchangeSelect} {...rests} placeholder={placeholder} options={props.options} />
    );
};

export default memo(InputSelect);

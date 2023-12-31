import { Select } from "antd";
import styled from "styled-components";
export const WrapperSelectStyle = styled(Select)`
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  &:focus {
    background-color: rgb(232, 240, 254);
  }
`;

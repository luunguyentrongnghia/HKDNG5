import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypePass = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0;
  background-color: #fff;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: 50;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  color: #fff;
  background: #9255fd;
  span {
    color: #fff;
  }
  text-align: center;
  cursor: pointers;
`;

import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 13px;
  cursor: pointer;
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
export const WrapperModal = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgb(0 0 0 / 82%);
  z-index: 50;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
`;

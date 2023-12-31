import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WrapperTypePass, WrapperButtonMore } from './style'
import { apiResetPassword } from "../../api";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.err === 0) {
      toast.success(response.mes);
    } else {
      toast.info(response.mes);
    }
  };
  return (
    <WrapperTypePass> <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
      <label htmlFor="password" >
        Enter your password:{" "}
      </label>
      <input
        type="text"
        id="password"
        style={{ width: '800px', padding: '10px', borderBottomWidth: '1px', outline: 'none', borderRadius: 10 }}
        placeholder="Type here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%', gap: 4 }}>
        <WrapperButtonMore
          textbutton={'Submit'}
          onClick={handleResetPassword}
        />
      </div>
    </div></WrapperTypePass>


  );
};

export default ResetPassword;

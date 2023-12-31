import React, { useCallback, useEffect } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, WrapperButtonMore, WrapperModal } from './style'
import imageLogo from '../../accets/images/logo-login.png'
import { Image } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { apiForgotPassword, apiLogin } from '../../api';
import { validate } from '../../helpers';
import { login } from '../../store/user/userSlice';
import Swal from "sweetalert2";
import { toast } from 'react-toastify'




const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [invalidFields, setInvalidFields] = useState([]);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(null)
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = async () => {
        const invalids = validate({ email, password }, setInvalidFields);
        if (invalids === 0) {
            setLoading(true)
            const rs = await apiLogin({ email, Passwords: password });
            if (rs.err === 0) {
                dispatch(
                    login({
                        isLoggedIn: true,
                        token: rs.access_token,
                        userData: rs.userData,
                    })
                );
                setLoading(false)
                searchParams.get("redirect")
                    ? navigate(searchParams.get("redirect"))
                    : navigate(`/`);

            } else {
                Swal.fire("Oops!", rs.mes, "error");
                setLoading(false)
            }
        }
    }
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.err === 0) {
            toast.success(response.mes);
            setIsForgotPassword(false);
        } else {
            toast.info(response.mes);
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            {isForgotPassword && (
                <WrapperModal>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ color: 'white' }} htmlFor="email">
                            Enter your email:{" "}
                        </label>
                        <input
                            type="text"
                            id="email"
                            style={{ width: '800px', padding: '0.5rem', borderBottom: '1px', outline: 'none', borderRadius: 10 }}
                            placeholder="Exp: email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%', gap: 4 }}>
                            <WrapperButtonMore
                                textbutton={'Submit'}
                                onClick={handleForgotPassword}
                            />
                            <WrapperButtonMore
                                textbutton={'Back'}
                                onClick={() => {
                                    setIsForgotPassword(false);
                                }}
                            />
                        </div>
                    </div>
                </WrapperModal>


            )}
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" alue={email} onChange={handleOnchangeEmail} onFocus={() => setInvalidFields && setInvalidFields([])} />
                    {invalidFields?.some((el) => el.name === "email") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "email")?.mes}</span>}
                    <div style={{ position: 'relative' }}>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                            onFocus={() => setInvalidFields && setInvalidFields([])}
                        />
                    </div>
                    {invalidFields?.some((el) => el.name === "password") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "password")?.mes}</span>}
                    <Loading isLoading={loading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight onClick={() => {
                        setIsForgotPassword(true);
                    }}>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
                    <h4>Mua sắm tại LTTD</h4>
                </WrapperContainerRight>
            </div>
        </div >
    )
}

export default SignInPage
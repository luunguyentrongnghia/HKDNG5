import React, { useCallback } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperModal, WrapperTextLight } from './style'
import imageLogo from '../../accets/images/logo-login.png'
import { Image } from 'antd'
import { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { validate } from '../../helpers';
// import * as UserService from '../../services/UserService'
// import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
// import * as message from '../../components/Message/Message'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/app/appSlice'
import { apiFinalRegister, apiRegister } from '../../api'
import Swal from "sweetalert2";
const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);
    const [loading, setLoading] = useState(null)
    const [token, setToken] = useState("");
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    // const mutation = useMutationHooks(
    //     data => UserService.signupUser(data)
    // )

    // const { data, isLoading, isSuccess, isError } = mutation

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success()
    //         handleNavigateSignIn()
    //     } else if (isError) {
    //         message.error()
    //     }
    // }, [isSuccess, isError])

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangePhone = (value) => {
        setPhone(value)
    }

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = useCallback(async () => {
        const invalids = validate({ email, password, name, phone }, setInvalidFields);
        if (invalids === 0) {
            setLoading(true)
            const response = await apiRegister({ email, Passwords: password, Name: name, SDT: phone });
            if (response.err === 0) {
                setIsVerifiedEmail(true);
                setLoading(false)
            } else {
                Swal.fire("Oops!", response.mes, "error");
            }
        }
    })
    const finalRegister = async () => {
        const response = await apiFinalRegister(token);
        if (response.err === 0) {
            Swal.fire("Congratulation", response.mes, "success").then(() => {
                setIsVerifiedEmail(false);
                navigate('/sign-in')
            });
        } else {
            Swal.fire("Oops!", response.mes, "error");
            setIsVerifiedEmail(false);
            setToken("");
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            {isVerifiedEmail && (
                <WrapperModal>
                    <div style={{ padding: '2rem', borderRadius: '0.375rem', backgroundColor: 'white', width: '500px' }}>
                        <h4 className="">
                            we sent a code to your mail,Please check your mail and enter your
                            code
                        </h4>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            style={{ borderWidth: '1px', borderRadius: '0.375rem', padding: '0.5rem', outline: '2px solid transparent', outlineOffset: '2px' }}
                        />
                        <button
                            type="button"
                            style={{ padding: '0.5rem', backgroundColor: 'blue', fontWeight: '600', color: 'white', borderRadius: '0.375rem', marginLeft: '1rem' }}
                            onClick={finalRegister}
                        >
                            Submit
                        </button>
                    </div>
                </WrapperModal>
            )}
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    {invalidFields?.some((el) => el.name === "email") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "email")?.mes}</span>}
                    <InputForm placeholder="User name" value={name} onChange={handleOnchangeName} />
                    {invalidFields?.some((el) => el.name === "name") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "name")?.mes}</span>}
                    <InputForm placeholder="Phone" value={phone} onChange={handleOnchangePhone} />
                    {invalidFields?.some((el) => el.name === "phone") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "phone")?.mes}</span>}
                    <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
                        value={password} onChange={handleOnchangePassword} />
                    {invalidFields?.some((el) => el.name === "password") && <span style={{ color: 'red' }}>{invalidFields.find((el) => el.name === "password")?.mes}</span>}
                    <Loading isLoading={loading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !phone.length || !name.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
                    <h4>Mua sắm tại LTTD</h4>
                </WrapperContainerRight>
            </div>
        </div >
    )
}

export default SignUpPage
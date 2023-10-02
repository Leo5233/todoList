import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const {login, isAuthenticated} = useAuth();

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/todo')
    }
  }, [navigate, isAuthenticated])

  const handleClick = async () => {
    if (username.length === 0 || password.length === 0){
      return 
    }
    const success = await login({username, password}) //參數名稱要和auth.js中定義一樣
    if (success){
      navigate('/todo')
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      })
      return
    }
        Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      })
  }
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput label="帳號" placeholder="請輸入帳號" 
        onChange={(nameInputValue) => setUserName(nameInputValue)}/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput label="密碼" placeholder="請輸入密碼"
        type="password" onChange={(passwordInputValue) => setPassword(passwordInputValue)}/>
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};


export default LoginPage;

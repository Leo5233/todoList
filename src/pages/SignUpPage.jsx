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
import { useAuth } from '../contexts/AuthContext'
import Swal from 'sweetalert2'
const SignUpPage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('') 
  const navigate = useNavigate()
  const {register, isAuthenticated} = useAuth()

  //如果localStorage沒token則留在註冊頁，反之驗證token，success則轉到todo
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/todo')
    } 
  }, [navigate, isAuthenticated])

  const handleClick = async () =>  {
    try{
      if (username.length === 0 || email.length === 0 || password.length === 0){
        return
      }
      
      const success = await register({username, email, password})
      if(success){
        Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
        })
        return
      }
        Swal.fire({
        title: '註冊失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      })
    } catch(error){
      console.error(error)
    }
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer >
        <AuthInput label="帳號" placeholder="請輸入帳號" value={username}
        onChange={(nameInputValue) => setUserName(nameInputValue)}/>
      </AuthInputContainer>

      <AuthInputContainer >
        <AuthInput label="信箱" placeholder="請輸入電子郵件" value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput label="密碼" placeholder="請輸入密碼" value={password} 
        type="password" onChange={(passwordInputValue) => setPassword(passwordInputValue)}/>
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;

import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, TodoPage, SignUpPage, HomePage } from 'pages';
import { AuthProvider} from './contexts/AuthContext'

const basename = process.env.PUBLIC_URL //指向根目錄的.env檔
console.log(basename)

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, TodoPage, SignUpPage, HomePage } from 'pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="todo" element={<TodoPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

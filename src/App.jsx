import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import List from './components/List.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/list' element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

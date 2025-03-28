import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import List from './components/list';


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

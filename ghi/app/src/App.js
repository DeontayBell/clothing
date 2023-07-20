import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';
import HatForm from './HatForm';
import HatList from './HatList';
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes" element={<ShoeList />}/>
          <Route path="newshoe" element={<ShoeForm />}/>
          <Route path="hats" element={<HatList />}/>
          <Route path="newhat" element={<HatForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

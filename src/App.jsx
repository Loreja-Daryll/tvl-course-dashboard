import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MyCourses from './pages/MyCourses';
import Discussions from './pages/Discussions';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

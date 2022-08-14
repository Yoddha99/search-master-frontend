import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/globals.css';
import Search from './pages/Search';
import PageNotFound from './pages/PagNotFound';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Search />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

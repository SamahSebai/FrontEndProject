import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Changepass from './pages/changePass/Changepass';
import Alumnistatu from './pages/alumnistatu/Alumnistatu';
import RegisterAlumni from './pages/registerAlumni/RegisterAlumni';


function App() {
  return (
    <Router>
      <Routes>
         <Route path={`/resetPassword`} element={<Changepass/>} />
         <Route path={`/alumnistatu`} element={<Alumnistatu/>} />
         <Route path="/registeralumni" element={<RegisterAlumni/>}/>
      </Routes>
    </Router>
  );
}

export default App;

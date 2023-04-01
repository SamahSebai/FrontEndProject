import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Changepass from './pages/changePass/Changepass';


function App() {
  return (
    <Router>
      <Routes>
         <Route path={`/resetPassword`} element={<Changepass/>} />
      </Routes>
    </Router>
  );
}

export default App;

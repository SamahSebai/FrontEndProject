
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Updatecv from "./Cv/UpdateCv";
import UpdateUser from "./Etudient/EditUser";







function App() {
  return (
    <Router>
      <Routes>
 
         <Route path="/UpdateUser" element={<UpdateUser/>} />
         <Route path={`/updateCv/:id`} element={<Updatecv/>} />
      

      </Routes>
    </Router>
  );
}

export default App;
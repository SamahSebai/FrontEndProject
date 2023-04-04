
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateEnseignant from "./pages/Enseignant/createEnseignant";
import DeleteEnseignant from "./pages/Enseignant/deleteEnseignant";
import UpdateEnseignant from "./pages/Enseignant/updateEnseignant";
import CreateEvent from "./pages/Event/createEvent";
import DeleteEvent from "./pages/Event/deleteEvent";
import UpdateEvent from "./pages/Event/updateEvent";
import EventTable from "./pages/Event/EventTable";
import EnseignantTable from "./pages/Enseignant/EnseignantTable";






function App() {
  return (
    <Router>
      <Routes>
 
      
         <Route path={`/updateEvent/:id`} element={<UpdateEvent/>} />
         <Route path={`/DeleteEvent/:id`} element={<DeleteEvent/>} />
         <Route path="/CreateEvent" element={<CreateEvent/>} />
         <Route path="/EventTable" element={<EventTable/>} />

         <Route path="/EnseignantTable" element={<EnseignantTable />} />
         <Route path="/CreateEnseignant" element={<CreateEnseignant/>} />
         <Route path={`/updateEnseignant/:id`} element={<UpdateEnseignant/>} />
         <Route path={`/deleteEnseignant/:id`} element={<DeleteEnseignant/>} />


      </Routes>
    </Router>
  );
}

export default App;
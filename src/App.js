import Changepass from "./pages/changePass/Changepass";
import Alumnistatu from "./pages/alumnistatu/Alumnistatu";
import RegisterAlumni from "./pages/registerAlumni/RegisterAlumni";

import Updatecv from "./Cv/UpdateCv";
import UpdateUser from "./Etudient/EditUser";
import EventTable from "./pages/Event/EventTable";
import EnseignantTable from "./pages/Enseignant/EnseignantTable";

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import CrudStudent from "./components/crudStudent/CrudStudent";
import Login from "./pages/Login/Login";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import { getUserByRole } from "./services/loginService";
import UpdateEnseignant from "./pages/Enseignant/updateEnseignant";
import DeleteEnseignant from "./pages/Enseignant/deleteEnseignant";
import DeleteEvent from "./pages/Event/deleteEvent";
import CreateEnseignant from "./pages/Enseignant/createEnseignant";
import CreateEevent from "./pages/Event/createEvent";
import UpdateEvent from "./pages/Event/updateEvent";
import ValiderAlumni from "./pages/validerAlumni/ValiderAlumni";

function App() {
  const [logged, setlogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({
    role: "",
  });

  const getRole = () => {
    getUserByRole(
      (data) => setuser(data),
      () => {}
    );
  };

  useEffect(() => {
    const AUTH_TOKEN = "token";
    const itemStr = localStorage.getItem(AUTH_TOKEN);
    if (!itemStr) {
      setlogged(false);
    } else {
      setlogged(true);
      getRole();
      console.log(user);
    }
    setloading(false);
  }, [user]);

  return (
    <div className="d-flex">
      {!loading && (
        <BrowserRouter>
          {logged ? <SignedRoutes user={user} /> : <UnsignedRoutes />}
        </BrowserRouter>
      )}
    </div>
  );
}

const UnsignedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};

const SignedRoutes = ({ user }) => {
  return (
    <>
      <SideMenu user={user} />
      {user === "ADMIN" && (
        <Routes>
          <Route path="dashboard" element={<></>} />
          <Route path="/students" element={<CrudStudent />} />
          <Route path="/enseignants" element={<EnseignantTable />} />
          <Route path="/CreateEnseignant" element={<CreateEnseignant />} />
          <Route path="/CreateEvent" element={<CreateEevent />} />
          <Route path="/updateEnseignant/:id" element={<UpdateEnseignant />} />
          <Route path="/deleteEnseignant/:id" element={<DeleteEnseignant />} />
          <Route path="/updateEvent/:id" element={<UpdateEvent />} />
          <Route path="/deleteEvent/:id" element={<DeleteEvent />} />
          <Route path="/events" element={<EventTable />} />
          <Route path="/registeralumni" element={<RegisterAlumni />} />
          <Route path="/valideralumni" element={<ValiderAlumni/>} />
          <Route path="/resetPassword" element={<Changepass />} />
          <Route path="/*" element={<Navigate to={"/dashboard"} />} />
        </Routes>
      )}
      {user === "Etudiant" && (
        <Routes>
          {/* <Route path="profile" element={<></>} />*/}
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/UpdateCV/:id" element={<Updatecv />} />
          <Route path="/students" element={<CrudStudent />} />
          <Route path="/resetPassword" element={<Changepass />} />
          {/* <Route path="/*" element={<Navigate to={"/profile"} />} /> */}
        </Routes>
      )}
      {user === "ALumni" && (
        <Routes>
          <Route path="profile" element={<Alumnistatu />} />
          <Route path="/resetPassword" element={<Changepass />} />
          <Route path="/*" element={<Navigate to={"/profile"} />} />
        </Routes>
      )}
    </>
  );
};

export default App;

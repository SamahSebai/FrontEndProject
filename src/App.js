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
import { getUserByRole , getEtat } from "./services/loginService";
import UpdateEnseignant from "./pages/Enseignant/updateEnseignant";
import DeleteEnseignant from "./pages/Enseignant/deleteEnseignant";
import DeleteEvent from "./pages/Event/deleteEvent";
import CreateEnseignant from "./pages/Enseignant/createEnseignant";
import CreateEevent from "./pages/Event/createEvent";
import UpdateEvent from "./pages/Event/updateEvent";
import ValiderAlumni from "./pages/validerAlumni/ValiderAlumni";
import Statistiques from "./pages/statistiques/Statistiques";
import Demande from "./pages/demande/Demande";
import Expert from "./pages/expert/Expert";
import Vacation from "./pages/vacation/Vacation";
import AddBlog from "./pages/crudBlog/AddBlog";
import ShowBlogs from "./pages/crudBlog/ShowBlogs";
import UpdateBlog from "./pages/crudBlog/UpdateBlog";
import image from "./image.jpg";
import Pfe from "./pages/PFE/Pfe";
import Stage from "./pages/Stage/Stage";
import EnsPfe from "./pages/Enseignant_PFE/EnsPfe";

function App() {
  const [logged, setlogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [etat, setetat] = useState();
  const [user, setuser] = useState({
    role: "",
  });

  const getRole = () => {
    getUserByRole(
      (data) => setuser(data),
      () => {}
    );
  };
  const getetat = () => {
    getEtat(
      (dataE) => setetat(dataE),
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
      getetat();
      console.log(etat);
      console.log(user);
    }
    setloading(false);
  }, [user]);

  return (
    <div className="d-flex">
      {!loading && (
        <BrowserRouter>
          {logged ? <SignedRoutes user={user} etat={etat} /> : <UnsignedRoutes />}
        </BrowserRouter>
      )}
    </div>
  );
}

const UnsignedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registeralumni" element={<RegisterAlumni />} />
      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
};

const SignedRoutes = ({ user ,etat }) => {
  return (
    <>
      <SideMenu user={user} />
      {user === "ADMIN" && (
        <Routes>
          <Route path="dashboard"element={<><img src={image}alt="Image"style={{ display: "block", margin: "0 auto",width: "600px",height: "450px",}}/></>}/>
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
          <Route path="/statistiques" element={<Statistiques/>} />
          <Route path="/Dexpert" element={<Expert/>} />
          <Route path="/Dvacation" element={<Vacation/>} />
          <Route path="/resetPassword" element={<Changepass />} />
          <Route path="/*" element={<Navigate to={"/dashboard"} />} />
        </Routes>
      )}
      {user === "Etudiant" && (
        <Routes>
          {/* <Route path="profile" element={<></>} />*/}
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/UpdateCV/:id" element={<Updatecv />} />
          <Route path="/addPFE" element={<Pfe />} />
          <Route path="/addStage" element={<Stage />} />
          <Route path="/resetPassword" element={<Changepass />} />
          {/* <Route path="/*" element={<Navigate to={"/profile"} />} /> */}
        </Routes>
      )}
      {user === "ALumni" && (
        <Routes>
          {//here showBlogs and updateblog are not related to etat alumni becouse he cant add blog so he cant update 
          }
          <Route path="profile" element={<Alumnistatu />} />
          <Route path="/showblogs" element={<ShowBlogs/>} />
          <Route path="/updateBlog/:id" element={<UpdateBlog/>} />
          <Route path="/*" element={<Navigate to={"/profile"} />} />
          {etat===true &&(
            <>
            <Route path="/UpdateUser" element={<UpdateUser />} />
            <Route path="/UpdateCV/:id" element={<Updatecv />} />
            <Route path="/addblog" element={<AddBlog/>} />
            <Route path="/students" element={<CrudStudent />} />
            <Route path="/demande" element={<Demande/>} />
            <Route path="/resetPassword" element={<Changepass />} />
            </>
          )}
        </Routes>
      )}
      {user === "Enseignant" && (
        <Routes>
          <Route path="/pfenonaffecte" element={<EnsPfe />} />
          {/* <Route path="/statistiquesPFE" element={<EnsPfe />} /> */}
          <Route path="/*" element={<Navigate to={"/pfenonaffecte"} />} />
        </Routes>
      )}
    </>
  );
};

export default App;

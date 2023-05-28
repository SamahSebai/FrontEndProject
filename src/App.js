import Changepass from "./pages/changePass/Changepass";
import Alumnistatu from "./pages/alumnistatu/Alumnistatu";
import RegisterAlumni from "./pages/registerAlumni/RegisterAlumni";
import Updatecv from "./Cv/UpdateCv";
import UpdatecvAlu from "./Cv/updateCvAlu";
import MainCv from "./Cv/MainCv";

import UpdateUser from "./Etudient/EditUser";
import ShowUser from "./Etudient/ShowUser";
import EventTable from "./pages/Event/EventTable";
import EnseignantTable from "./pages/Enseignant/EnseignantTable";
import CrudPFA from "./crudPFA/crudPFA";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import CrudStudent from "./components/crudStudent/CrudStudent";
import Login from "./pages/Login/Login";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import { getUserById, getUserByRole, getEtat } from "./services/loginService";
import PfaAdmin from "./components/pfa-admin/pfaAdmin";
import UpdateEnseignant from "./pages/Enseignant/updateEnseignant";
import {
  getCrudEtudiant,
  getCrudEnseignant,
  getCrudEvent,
} from "./services/loginService";
import DeleteEnseignant from "./pages/Enseignant/deleteEnseignant";
import DeleteEvent from "./pages/Event/deleteEvent";
import CreateEnseignant from "./pages/Enseignant/createEnseignant";
import CreateEevent from "./pages/Event/createEvent";
import AdminList from "./pages/admin/adminList";
import UserDetail from "./Etudient/UserDetail";
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
import io from "socket.io-client";
import EnsPfe from "./pages/Enseignant_PFE/EnsPfe";
import PFEList from "./components/PFEList/PFEList";
import Stat from "./components/statpfe/stat";
import Notif from "./components/notifs/Notif";
import Saison from "./components/saison/Saison";
import StudentPublic from "./components/crudStudentPublic/CrudStudent";
import UpdateSeason from "./pages/UpdateSeason/UpdateSeason";
import AllEvents from "./pages/Event/AllEvents";
import VoirCv from "./components/VoirCv/VoirCv";

function App() {
  const [logged, setlogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [etat, setetat] = useState();
  const [CrudEtudiant, setCrudEtudiant] = useState();
  const [CrudEnseignant, setCrudEnseignant] = useState();
  const [CrudEvent, setCrudEvent] = useState();
  const [user, setuser] = useState({
    role: "",
    _id: "",
  });
  const [socket, setSocket] = useState(null);

  const getRole = () => {
    getUserByRole(
      (data) => {
        setuser(data);
        console.log("hedha user", data);
      },

      () => {}
    );
  };

  const getCrudetudiant = () => {
    getCrudEtudiant(
      (dataCrudetudiant) => setCrudEtudiant(dataCrudetudiant),
      () => {}
    );
  };
  const getCrudenseignant = () => {
    getCrudEnseignant(
      (dataCrudenseignant) => setCrudEnseignant(dataCrudenseignant),
      () => {}
    );
  };
  const getCrudevent = () => {
    getCrudEvent(
      (dataCrudevent) => setCrudEvent(dataCrudevent),
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
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (socket) {
      getUserById((data) => {
        socket.on(`notif-pfe-${data}`, (resp) => {
          alert(resp);
        });
      });
    }
  }, [socket]);

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
      getCrudevent();
      getCrudenseignant();
      getCrudetudiant();
    }
    setloading(false);
  }, [user]);

  return (
    <div className="d-flex">
      {!loading && (
        <BrowserRouter>
          {logged ? (
            <SignedRoutes
              user={user}
              etat={etat}
              CrudEtudiant={CrudEtudiant}
              CrudEnseignant={CrudEnseignant}
              CrudEvent={CrudEvent}
            />
          ) : (
            <UnsignedRoutes />
          )}{" "}
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

const SignedRoutes = ({
  user,
  etat,
  CrudEtudiant,
  CrudEnseignant,
  CrudEvent,
}) => {
  return (
    <>
      <SideMenu user={user} />
      {user === "ADMIN" && (
        <Routes>
          <Route
            path="dashboard"
            element={
              <>
                <img
                  src={image}
                  alt="Image"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    width: "600px",
                    height: "450px",
                  }}
                />
              </>
            }
          />

          <Route path="dashboard" element={<></>} />
          {CrudEtudiant === true && (
            <Route path="/students" element={<CrudStudent />} />
          )}
          {CrudEnseignant === true && (
            <Route path="/enseignants" element={<EnseignantTable />} />
          )}
          {CrudEvent === true && (
            <Route path="/events" element={<EventTable />} />
          )}
          <Route path="/CreateEnseignant" element={<CreateEnseignant />} />
          <Route path="/CreateEvent" element={<CreateEevent />} />
          <Route path="/updateEnseignant/:id" element={<UpdateEnseignant />} />
          <Route path="/deleteEnseignant/:id" element={<DeleteEnseignant />} />
          <Route path="/updateEvent/:id" element={<UpdateEvent />} />
          <Route path="/deleteEvent/:id" element={<DeleteEvent />} />
          <Route path="/ajoutersaison" element={<Saison />} />
          <Route path="/registeralumni" element={<RegisterAlumni />} />
          <Route path="/valideralumni" element={<ValiderAlumni />} />
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/Dexpert" element={<Expert />} />
          <Route path="/Dvacation" element={<Vacation />} />
          <Route path="/registeralumni" element={<RegisterAlumni />} />
          <Route path="/adminList" element={<AdminList />} />
          <Route path="/etudiant/:id" element={<UserDetail />} />
          <Route path="/resetPassword" element={<Changepass />} />
          <Route path="/listepfe" element={<PFEList />} />
          <Route path="/statistiquespfe" element={<Stat />} />
          <Route path="/pfa-admin" element={<PfaAdmin />} />
        </Routes>
      )}
      {user === "Etudiant" && (
        <Routes>
          {/* <Route path="profile" element={<></>} />*/}
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/publicStudents" element={<StudentPublic />} />
          <Route path="/UpdateSeason/:id" element={<UpdateSeason />} />
          {/*<Route path="/UpdateCV/:id" element={<Updatecv />} />*/}
          <Route path="/UpdateCV" element={<Updatecv />} />
          <Route path="/MainCv" element={<MainCv />} />
          <Route path="/addPFE" element={<Pfe />} />
          <Route path="/addStage" element={<Stage />} />
          <Route path="/AllEvents" element={<AllEvents />} />
          <Route path="/resetPassword" element={<Changepass />} />
          <Route path="/notifications" element={<Notif />} />
          <Route path="/profile" element={<ShowUser />} />
          <Route path="/pfa" element={<CrudPFA showOnly />} />
          <Route path="/*" element={<Navigate to={"/profile"} />} />
        </Routes>
      )}
      {user === "ALumni" && (
        <Routes>
          {
            //here showBlogs and updateblog are not related to etat alumni becouse he cant add blog so he cant update
          }
          <Route path="profile" element={<Alumnistatu />} />
          <Route path="/UpdateCV" element={<UpdatecvAlu />} />
          <Route path="/showblogs" element={<ShowBlogs />} />
          <Route path="/updateBlog/:id" element={<UpdateBlog />} />
          <Route path="/*" element={<Navigate to={"/profile"} />} />
          {etat === true && (
            <>
              <Route path="/UpdateUser" element={<UpdateUser />} />
              <Route path="/UpdateCV/:id" element={<Updatecv />} />
              <Route path="/addblog" element={<AddBlog />} />
              <Route path="/students" element={<CrudStudent />} />
              <Route path="/demande" element={<Demande />} />
              <Route path="/resetPassword" element={<Changepass />} />
            </>
          )}
        </Routes>
      )}
      {user === "Enseignant" && (
        <Routes>
          <Route path="/pfenonaffecte" element={<EnsPfe />} />
          <Route path="/events" element={<EventTable />} />
          <Route path="/pfa" element={<CrudPFA />} />
          <Route path="/VoirCv" element={<VoirCv />} />
          {/* <Route path="/statistiquesPFE" element={<EnsPfe />} /> */}
          <Route path="/*" element={<Navigate to={"/pfenonaffecte"} />} />
        </Routes>
      )}
      {/*   {user === "Enseignant" && (
        <Routes>
          <Route path="/pfa" element={<CrudPFA />} />
        </Routes>
      )} */}
    </>
  );
};

export default App;

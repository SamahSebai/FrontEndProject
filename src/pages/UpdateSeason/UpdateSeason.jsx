import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import * as api from "../../services/crudEtudService"




const UpdateSeason = () => {
  const [level, setLevel] = useState('');
  const [diplome, setDiplome] = useState(false);
  const [validationError, setValidationError] = useState({ message: '' });
  const [openAlert, setAlert] = useState(false);
  const [user, setUser] = useState();
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mustUpdateProfil, setMustUpdateProfil] = useState(false);
 

  const handleDiplomaChange = (e) => {
    setDiplome(e.target.value === 'true');
  };

  async function fetchUser() {
    const etudiantData = await api.getEtudiantById(id);
    console.log(etudiantData)
    setUser(etudiantData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.academicProgress(user?._id, { level, diplome }); 
      console.log(user);
      setMustUpdateProfil(false);
      await api.updateSeason(mustUpdateProfil);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error(error);
      setValidationError({ message: "Une erreur s'est produite lors de la mise à jour de l'année universitaire." });
      setAlert(true);
    }
  };


  useEffect(() => {
    fetchUser();
    if (user) {
      setMustUpdateProfil(user.mustUpdateProfil);
    }
  }, [user]);

  
  return (
    <>
      {isSubmitted ? (
       window.location.reload()
      ) : (
        <div id="userForm" className="center" class="UpdateSeason">
          <div className="container">
            <h3 data-test="studentProfile">Mise à jour de l'année universitaire</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <div>
                <label>
                  Niveau d'études:
                  <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="">Sélectionnez votre niveau</option>
                    <option value="1">Première année</option>
                    <option value="2">Deuxième année</option>
                    <option value="3">Troisième année</option>
                  </select>
                </label>
              </div>
              {level === '3' && (
                <div>
                  <label>
                    Avez-vous obtenu votre diplôme ?
                    <select value={diplome ? 'true' : 'false'} onChange={handleDiplomaChange}>
                      <option value="">Sélectionnez votre réponse</option>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </label>
                </div>
              )}
              <button type="submit">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSeason;
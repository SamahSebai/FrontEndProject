import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from "../../services/crudEtudService"


const UpdateSeason = ({ user }) => {
  const [level, setLevel] = useState('');
  const [diplome, setDiplome] = useState(false); // la valeur par défaut est false

  
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState({ message: '' });
  const [openAlert, setAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ mustUpdateProfil, setMustUpdateProfil] = useState(false);
  // Nouvelle propriété d'état pour le suivi de la soumission du formulaire

  // Ajout d'un état pour la date actuelle
  const [currentDate, setCurrentDate] = useState(new Date());

  // Définition de la date de début et de fin pour l'affichage du modal


  const handleLevelChange = (e) => {
    const selectedLevel = parseInt(e.target.value);

    // Vérification si l'étudiant a choisi un niveau supérieur
    if (selectedLevel > parseInt(level)) {
      // Calcul du nouveau niveau en ajoutant 1 à l'ancien niveau
      const newLevel = (parseInt(level) + 1).toString();
      setLevel(newLevel);
      console.log(level)
    } else {
      setLevel(e.target.value);
    }

    // Réinitialisation de la valeur de diplome si le niveau est différent de "Troisième année"
    if (e.target.value !== '3') {
      setDiplome(false);
    }
  };

  const handleDiplomaChange = (e) => {
    setDiplome(e.target.value === 'yes'); // convertit la chaîne en booléen
  };

  const academicProgress = async ({level, diplome}) => {
    try {
      await api.academicProgress({level, diplome});
      setValidationError(null);
      setAlert(true);
    } catch (error) {
      setValidationError({ message: JSON.stringify(error.response.data.Message) });
      setAlert(true);
    }
  };

  const handleUpdateSeason = async () => {
    try {
      await api.updateSeason();
      setValidationError(null);
      setAlert(true);

    } catch (error) {
      setValidationError({ message: JSON.stringify(error.response.data.Message) });
      setAlert(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await academicProgress({level, diplome});
    
    await handleUpdateSeason(); 
    console.log('level: ', level);
    setMustUpdateProfil(true); 
    // Met à jour la propriété d'état  pour indiquer que le formulaire a été soumis
  };

  return (
    <>
      {!user?.mustUpdateProfil && (
        <div id="userForm" className="center" class="UpdateSeason">
          <div className="container">
            <h3>Mise à jour l'année universitaire</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <div data-test="studentProfile">
                <label>
                  Niveau d'études:
                  <select value={level} onChange={handleLevelChange}>
                    <option value="">Sélectionnez votre niveau</option>
                    <option value="1">Première année</option>
                    <option value="2">Deuxième année</option>
                    <option value="3">Troisième année</option>
                  </select>
                </label>
              </div>
              {level === '3' && ( // affiche le champ diplome si le niveau est "Troisième année"
                <div>
                  <label>
                    Avez-vous obtenu votre diplôme ?
                    <select value={diplome ? 'yes' : 'no'} onChange={handleDiplomaChange}> {/* convertit le booléen en chaîne */}
                      <option value="">Sélectionnez votre réponse</option>
                      <option value="yes">Oui</option>
                      <option value="no">Non</option>
                    </select>
                  </label>
                </div>
              )}
              <button type="submit">
                <Link to={"/student/modifierprofile"}>Enregistrer</Link>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSeason;
import axios from "axios";
import { useState } from "react";
import "./registerAlumni.css";

export default function RegisterAlumni() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [pays, setpays] = useState("");
  const [société, setsociété] = useState("");
  const [promotion, setpromotion] = useState("");
  const [Specialite, setSpecialite] = useState("");
  const [visibilite, setvisibilite] = useState(true);
  const [diplome, setdiplome] = useState(true);
  const [dateDiplome, setdateDiplome] = useState();
  const [dateEmbouche, setdateEmbouche] = useState();
  const [role, setrole] = useState("ALumni");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post(
        "http://localhost:4000/Api/V1/registerAlumni",
        {
          firstName,
          lastName,
          address,
          pays,
          société,
          promotion,
          Specialite,
          visibilite,
          diplome,
          dateDiplome,
          dateEmbouche,
          role,
          email,
          password,
        }
      );
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registertitle">Register Alumni </span>
      <div>
        <form className="container1"  onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              required
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              required
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          

          <div className="form-group">
            <label htmlFor="pays">Country:</label>
            <select
              className="form-control"
              id="pays"
              name="pays"
              required
              onChange={(e) => setpays(e.target.value)}
            >
    <option value="">Select a country</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Australia">Australia</option>
    <option value="Brazil">Brazil</option>
    <option value="Canada">Canada</option>
    <option value="China">China</option>
    <option value="France">France</option>
    <option value="Germany">Germany</option>
    <option value="India">India</option>
    <option value="Italy">Italy</option>
    <option value="Japan">Japan</option>
    <option value="Mexico">Mexico</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Russia">Russia</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Spain">Spain</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
  </select>
</div>

          <div class="form-group">
            <label for="société">société:</label>
            <input
              type="text"
              class="form-control"
              id="société"
              name="société"
              required
              onChange={(e) => setsociété(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="promotion">promotion:</label>
            <input
              type="text"
              class="form-control"
              id="promotion"
              name="promotion"
              required
              onChange={(e) => setpromotion(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="specialite">Specialite:</label>
            <input
              type="text"
              className="form-control"
              id="specialite"
              name="specialite"
              required
              onChange={(e) => setSpecialite(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="visibilite">
              Haw do you want to set the visibility of your account{" "}
            </label>
            <select className="visibilite" onChange={(e) => setvisibilite(e.target.value)}>
              <option value={true}>--public--</option>
              <option value={false}>--private--</option>
            </select>
          </div>
          <div className="form-group">
            <label for="diplome">Have you received your diploma</label>
            <select className="diplome"  onChange={(e) => setdiplome(e.target.value)}>
              <option value={true}>--yes ,I have--</option>
              <option value={false}>--No ,I havent--</option>
            </select>
          </div>
          <div>
          <label for="date">Diploma date:</label>
          <input type="date" id="dateDiploma" class="form-control" name="dateDiplome" onChange={(e) => setdateDiplome(e.target.value)}/>
          </div>
          <div>
          <label for="date">Hire date:</label>
          <input type="date" id="dateHire" class="form-control" name="dateEmbouche" onChange={(e) => setdateEmbouche(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="email">Password:</label>
            <input
              type="password"
              className="form-controlp"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>

      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          somthing went wrong
        </span>
      )}
    </div>
  );
}

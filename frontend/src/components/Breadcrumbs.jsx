import { useNavigate } from "react-router-dom";
import "../style/Breadcrumbs.css"; // Ensure this file exists

const Breadcrumbs = () => {
  const navigate = useNavigate();

  return (
    <nav className="breadcrumbs">
      <button onClick={() => navigate("/")} className="breadcrumb-btn">Home</button> &gt; 
      <button onClick={() => navigate("/collection")} className="breadcrumb-btn">Collection</button> &gt; 
      <span>Rings</span>
    </nav>
  );
};

export default Breadcrumbs;

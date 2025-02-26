import { motion } from "framer-motion";
import "../style/Spinner.css";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* Simple Rotating Loader Ring */}
      <motion.div
        className="loader-ring"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Loader;
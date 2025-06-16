import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import IndexPage from "./pages/IndexPage/IndexPage";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh(); // to detect newly rendered elements
  }, []);
  return (
    <div>
      <IndexPage />
    </div>
  );
};

export default App;

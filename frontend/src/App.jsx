//import { Contact } from "lucide-react";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
// import ContactInfo from "./components/contactInfo/ContactInfo";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import Contact from "./components/contact/Contact";
const App = () => {
  return (
    <>
      <Hero />
      <Navbar />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      {/* <ContactInfo /> */}
    </>
  );
};

export default App;

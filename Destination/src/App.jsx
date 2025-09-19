import { Route, Routes } from "react-router-dom";
import ExperiencePostForm from "./ExperiencePostForm";
import Home from "./home";
import ExperienceDetailsPage from "./ExperienceDetailsPage";
import ExploreEvents from "./ExploreEvents";
function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/addexperience" element={<ExperiencePostForm />} />
         <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
          <Route path="/explore" element={<ExploreEvents />} />
      </Routes>
    </>
  );
}
export default App;

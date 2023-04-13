import "animate.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Friends from "./Pages/Friends/Friends";
import Groupe from "./Pages/Groupe/Groupe";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignIn/SignIn";
import Story from "./Pages/Story/Story";
import Video from "./Pages/Video/Video";
import ViewPhoto from "./Pages/ViewPhoto/ViewPhoto";

function App() {
  // Auth Security
  const { user } = useSelector((x) => x.auth);
  const { value } = useSelector((x) => x.theme);

  return (
    <div className={`root_of_facebook ${value}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user.first_name ? <Home /> : <SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/profile/:username"
            element={user.first_name ? <Profile /> : <SignIn />}
          />
          <Route
            path="/friends"
            element={user.first_name ? <Friends /> : <SignIn />}
          />
          <Route path="/story" element={<Story />} />
          <Route path="/view_image" element={<ViewPhoto />} />
          <Route path="/video" element={<Video />} />
          <Route path="/groupe" element={<Groupe />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

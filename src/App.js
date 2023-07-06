
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoutes from './components/Common/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import Podcasts from "./pages/Podcasts";
import PodcastDetails from './pages/PodcastDetails';
import CreateAnEpisode from './pages/CreateAnEpisode';
import EditPodcast from './pages/EditPodcast';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid),
          (userdoc) => {
            if (userdoc.exists()) {
              const userData = userdoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error in fetching userData", error);
          }
        );
      }
    });

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          
          <Route path="/" element={<SignUpPage/>} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create-a-podcast" element={<CreateAPodcast/>}/>
            <Route
                  path="/podcast/:id/create-episode"
                  element={<CreateAnEpisode />}
                />
             <Route
                  path="/podcast/:id/edit-podcast"
                  element={<EditPodcast/>}
                />    
            <Route path="/podcast/:id" element={<PodcastDetails/>} />
            <Route path="/podcasts" element={<Podcasts/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

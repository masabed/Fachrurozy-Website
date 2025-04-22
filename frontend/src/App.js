import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Bloglist from "./pages/Bloglist";
import BlogDetails from "./pages/BlogDetails";
import BlogDetails2 from "./pages/BlogDetails2";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel"; // Import the Admin Panel

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/blogs" component={Bloglist} exact />
        <Route path="/blogs/:id" component={BlogDetails} />
        <Route path="/login" component={Login} exact />
        <Route path="/adminpanel" component={AdminPanel} exact /> {/* Add Admin Panel route */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
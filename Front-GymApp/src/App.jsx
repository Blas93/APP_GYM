import { Route, Routes } from "react-router-dom";

//___Importamos nuestra páginas a nuestra App
import { Header } from "./componentes/Header.jsx";

import { HomePagePublic } from "./pages/HomePagePublic.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AddActivity } from "./pages/AddActivity.jsx";
import { ActivityPage} from "./pages/ActivityPage.jsx";
import { EditInformationActivityPage } from "./pages/EditInformationActivityPage.jsx";
import { DeleteInformationActivityPage } from "./pages/DeleteInformationActivityPage.jsx";
import { AuthProviderComponent } from "./context/AuthContext.jsx";
import '../src/App.css'
import { Footer } from "./componentes/Footer.jsx";
import { UserPage } from "./pages/UserPage.jsx";



function App() {
  return (
    <AuthProviderComponent>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePagePublic />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          <Route path="/activity/:id/new" element={<AddActivity />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/activities/:id/editInformation" element={<EditInformationActivityPage />} />
          <Route path="/activities/:id/delete" element={<DeleteInformationActivityPage />} />
         
        </Routes>
      </main>
      <Footer/>
    </AuthProviderComponent>
  );
}

export default App;

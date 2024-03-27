import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Pollution from "./components/Pollution";
import TheWeather from "./components/TheWeather"
import GlobalStyles from "./GlobalStyles";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import PollutionReport from "./components/PollutionReport";
import WeatherReport from "./components/WeatherReport";

function App() {
  return (
    <div>
        <GlobalStyles />
        <Banner />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pollution" element={<Pollution />} />
          <Route path="/weather" element={<TheWeather />} />
          <Route path="/account/pollution" element={<PollutionReport />} />
          <Route path="/account/weather" element={<WeatherReport />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
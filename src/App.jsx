
import './App.css'
import Home from "./pages/Home.jsx";
import Cow from "./pages/Cow.jsx";
import MedicationInventory from "./pages/MedicationInventory.jsx";
import Treatment from "./pages/Treatment.jsx";
import ClawTreatment from "./pages/ClawTreatment.jsx";
import Medication from "./pages/Medication.jsx";
import Disease from "./pages/Disease.jsx";
import RestockMedication from "./pages/RestockMedication.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TreatmentHistory from "./pages/TreatmentHistory.jsx";
import ClawTreatmentHistory from "./pages/ClawTreatmentHistory.jsx";
import CowDetails from "./pages/CowDetails.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cows" element={<Cow />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/medication" element={<Medication />} />
                <Route path="/medication-inventory" element={<MedicationInventory />} />
                <Route path="/treatment" element={<Treatment/>} />
                <Route path="/claw-treatment" element={<ClawTreatment/>} />
                <Route path="/restock" element={<RestockMedication />} />
                <Route path="/history" element={<TreatmentHistory />} />
                <Route path="/clawhistory" element={<ClawTreatmentHistory/>} />
                <Route path="/cowdetails/:id" element={<CowDetails/>} />
            </Routes>
        </BrowserRouter>



    </>
  )
}

export default App

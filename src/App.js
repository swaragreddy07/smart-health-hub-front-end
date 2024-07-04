import React from 'react'
import {BrowserRouter as Router,Routes,Route,Link, useNavigate}  from 'react-router-dom';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Otp from "./Components/Otp";
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';
import Service from './Components/Service';
import PatientSymptomchecker from './MembersComponents/PatientSymptomchecker';
import PatientAppointmentmanagement from './MembersComponents/PatientAppointmentmanagementsystem';
import PatientMedicationReminder from './MembersComponents/PatientMedicationReminder';
import PatientPrescriptionManagement from './MembersComponents/PatientPrescriptionManagement';
import PatientPhr from './MembersComponents/PatientPhr';
import PatientHeader from './MembersComponents/PatientHeader';
import Patients from './MembersComponents/Patients';
import PatientCommunityinteraction from './MembersComponents/PatientCommunityinteraction';
import DoctorHeader from './MembersComponents/DoctorHeader';
import Doctors from './MembersComponents/Doctors';
import DoctorEprescriptions from './MembersComponents/DoctorsEPrescriptions';
import DoctorAppointmentManagement from './MembersComponents/DoctorAppointmentManagement';
import DoctorsAnalyticaldashboard from './MembersComponents/DoctorsAnalyticaldashboard';
import DoctorAccessPhr from './MembersComponents/DoctorAccessPhr';
import DoctorProfessionalCollab from './MembersComponents/DoctorProfessionalCollab';
import DoctorSecureMessaging from './MembersComponents/DoctorSecureMessaging';
import Admin from './MembersComponents/Admin';
import AdminUsermanagement from './MembersComponents/AdminUsermanagement';
import Adminhealthcareprovidermanagement from './MembersComponents/Adminhealthcareprovidermanagement';
import AdminSystemConfiguration from './MembersComponents/AdminSystemConfiguration';
import AdminDataoversight from './MembersComponents/AdminDataoversight';
import AdminReportGeneration from './MembersComponents/AdminReportGeneration';
import HealthAdmin from './MembersComponents/HealthAdmin';
import HealthadminFacilityManagement from './MembersComponents/HealthadminFacilityManagement';
import HealthAdminStaffcoordination from './MembersComponents/HealthAdminStaffcoordination';
import HealthadminIncidentresponse from './MembersComponents/HealthadminIncidentresponse';
import HealthadminComplianceoversight from './MembersComponents/HealthadminComplainceoversight';
import PharmacyMedicationDispensation from './MembersComponents/PharmacyMedicationDispensation';
import PharmacyMedicationHistory from './MembersComponents/PharmacyMedicationHistory';
import PharmacyCommunication from './MembersComponents/PharmacyCommunication';
import Pharmacy from './MembersComponents/Pharmacy';
import ForumTopics from './Components/ForumTopics';
import Forum from './Components/Forum';
import MedicalHistory from './MembersComponents/MedicalHistory';
import VitalSigns from './MembersComponents/VitalSigns';
import ExerciseData from './MembersComponents/ExerciseData';
import Prescription from './MembersComponents/Prescription';
import HealthadminFacility from './MembersComponents/HealthadminFacility';

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/sign-in' Component={SignIn}/>
        <Route exact path='/sign-up' Component={SignUp}/>
        <Route exact path="/otp" Component={Otp} />
        <Route exact path='/service' Component={Service}/>
        <Route exact path='/contact-us' Component={ContactUs}/>
        <Route exact path='/about-us' Component={AboutUs}/>
        <Route exact path='/patient-header' Component={PatientHeader}/>
        <Route exact path='/medical' Component={MedicalHistory}/>
        <Route exact path='/vital' Component={VitalSigns}/>
        <Route exact path='/excercise' Component={ExerciseData}/>
        <Route exact path='/pres' Component={Prescription}/>
        
        <Route exact path='/patient_dashboard' Component={Patients}/>
        <Route exact path='/symptom-checker' Component={PatientSymptomchecker}/>
        <Route exact path='/appointment-management' Component={PatientAppointmentmanagement}/>
        <Route exact path='/phr' Component={PatientPhr}/>
        <Route exact path='/reminder' Component={PatientMedicationReminder}/>
        <Route exact path='/prescription-management' Component={PatientPrescriptionManagement}/>
        <Route exact path='/community-interaction' Component={ForumTopics}/>
        <Route exact path="/forum" Component={Forum}/>

        <Route exact path='/doctor-header' Component={DoctorHeader}/>

        <Route exact path='/doctors' Component={Doctors}/>
        <Route exact path='/eprescriptions' Component={DoctorEprescriptions}/>
        <Route exact path='/healthappointments' Component={DoctorAppointmentManagement}/>
        <Route exact path='/analytics' Component={DoctorsAnalyticaldashboard}/>
        <Route exact path='/accessphr' Component={DoctorAccessPhr}/>
        <Route exact path='/message' Component={DoctorSecureMessaging}/>
        <Route exact path='/professional-collab' Component={ForumTopics}/>

<Route exact path='/admin' Component={Admin}/>
<Route exact path='/user-management' Component={AdminUsermanagement}/>
<Route exact path='/healthcareprovider-management' Component={Adminhealthcareprovidermanagement}/>
<Route exact path='/system-configuration' Component={AdminSystemConfiguration}/>
<Route exact path='/data-oversight' Component={AdminDataoversight}/>
<Route exact path='/report-generation' Component={AdminReportGeneration}/>

<Route exact path='/healthadmin' Component={HealthAdmin}/>

<Route exact path='/facility-management' Component={HealthadminFacility}/>
        <Route exact path='/staff-coordination' Component={HealthAdminStaffcoordination}/>
        <Route exact path='/incident-response' Component={HealthadminIncidentresponse}/>
        <Route exact path='/compliance' Component={HealthadminComplianceoversight}/>

        <Route exact path='/pharmacy' Component={Pharmacy}/>
 <Route exact path='/dispensation' Component={PharmacyMedicationDispensation}/>
        <Route exact path='/history' Component={PharmacyMedicationHistory}/>
        <Route exact path='/communication' Component={PharmacyCommunication}/>
        






        
        
        
        
        </Routes>
      
    </Router>
  )
}

export default App
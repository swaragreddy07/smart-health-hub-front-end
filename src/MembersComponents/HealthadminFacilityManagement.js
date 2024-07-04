//This is the Health Admin Facility management page
import React, { useState } from 'react';
import HealthAdminHeader from './HealthAdminHeader';

function HealthadminFacilityManagement() {
  // Initial facility data (dummy data)
  const initialFacilities = [
    { id: 1, name: 'Hospital A', location: 'City A', services: ['Emergency Care', 'Surgery'], operational: true },
    { id: 2, name: 'Clinic B', location: 'City B', services: ['General Checkup', 'Pediatrics'], operational: true },
    { id: 3, name: 'Health Center C', location: 'City C', services: ['Dental Care', 'Vaccination'], operational: false }
  ];

  // State to manage facility data
  const [facilities, setFacilities] = useState(initialFacilities);
  const [newFacility, setNewFacility] = useState({ name: '', location: '', services: [], operational: false });
  const [editFacility, setEditFacility] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFacility({ ...newFacility, [name]: value });
  };

  // Handle service checkbox changes
  const handleServiceChange = (service) => {
    const isChecked = newFacility.services.includes(service);
    if (isChecked) {
      setNewFacility({ ...newFacility, services: newFacility.services.filter(s => s !== service) });
    } else {
      setNewFacility({ ...newFacility, services: [...newFacility.services, service] });
    }
  };

  // Add a new facility
  const addFacility = () => {
    setFacilities([...facilities, { id: facilities.length + 1, ...newFacility }]);
    setNewFacility({ name: '', location: '', services: [], operational: false });
  };

  // Delete a facility
  const deleteFacility = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id));
  };

  // Set facility to edit mode
  const editFacilityDetails = (facility) => {
    setEditFacility(facility);
    setNewFacility(facility);
  };

  // Update facility details
  const updateFacility = () => {
    setFacilities(facilities.map(facility => (facility.id === editFacility.id ? { ...facility, ...newFacility } : facility)));
    setEditFacility(null);
    setNewFacility({ name: '', location: '', services: [], operational: false });
  };

  return (
    <>
    <HealthAdminHeader/>
    <div className='container'>
      <h1>Facility Management</h1>
      <div className='contact-form' style={{maxWidth:"800px"}}>
        <input
          type="text"
          name="name"
          value={newFacility.name}
          onChange={handleInputChange}
          placeholder="Facility Name"
        />
        <input
          type="text"
          name="location"
          value={newFacility.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <div>
          Services Offered:
          <div>
            <input
              type="checkbox"
              checked={newFacility.services.includes('Emergency Care')}
              onChange={() => handleServiceChange('Emergency Care')}
            />
            <label>Emergency Care</label>
          </div>
          <label>
            <input
              type="checkbox"
              checked={newFacility.services.includes('Surgery')}
              onChange={() => handleServiceChange('Surgery')}
            />
            Surgery
          </label>
        </div>
        <label>
          Operational:
          <input
            type="checkbox"
            checked={newFacility.operational}
            onChange={() => setNewFacility({ ...newFacility, operational: !newFacility.operational })}
          />
        </label>
        <button onClick={editFacility ? updateFacility : addFacility}>
          {editFacility ? 'Update Facility' : 'Add Facility'}
        </button>
      </div>
      <div className='contact-form' style={{maxWidth:"800px",marginTop:"25px"}}> 
        <h2>Existing Facilities</h2>
        {facilities.map(facility => (
          <div key={facility.id} style={{margin:"5px"}}>
            <span>{facility.name} - {facility.location}</span>
            <span>Services: {facility.services.join(', ')}</span>
            <span>Operational: {facility.operational ? 'Yes' : 'No'}</span>
            <button onClick={() => editFacilityDetails(facility)} style={{marginRight:"5px",marginLeft:"5px"}}>Edit</button>
            <button onClick={() => deleteFacility(facility.id)} style={{backgroundColor:"red"}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default HealthadminFacilityManagement;

//This is the pharmacy dashboard
import React from 'react';
import { Link } from 'react-router-dom';
import PharmacistHeader from './PharmacistHeader';
import { Bar } from 'react-chartjs-2';

function Pharmacy() {
  const dispensedMedications = [
    { id: 1, medication: 'Medication A', dosage: '10mg', patient: 'John Doe', timestamp: new Date() },
    { id: 2, medication: 'Medication B', dosage: '20mg', patient: 'Jane Doe', timestamp: new Date() },
    { id: 3, medication: 'Medication C', dosage: '15mg', patient: 'Alice Smith', timestamp: new Date() }
  ];

  const messages = [
    { id: 1, sender: 'Patient', text: 'Hello, I have a question about my medication.', timestamp: new Date() },
    { id: 2, sender: 'Pharmacist', text: 'Sure, what is your question?', timestamp: new Date() }
  ];

  const medicationHistory = [
    { id: 1, medication: 'Medication A', dosage: '10mg', patient: 'John Doe', timestamp: new Date() },
    { id: 2, medication: 'Medication B', dosage: '20mg', patient: 'Jane Doe', timestamp: new Date() },
    { id: 3, medication: 'Medication C', dosage: '15mg', patient: 'Alice Smith', timestamp: new Date() }
  ];
  const medicationHistoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Medication History',
        data: [5, 10, 15, 20, 25, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <PharmacistHeader />
      <div className='card'>
        <Link to='/dispensation'>Medication Dispensation</Link>
      </div>
     
      <div className='card'>
        <Link to='/history'>Medication History</Link>
      </div>
      <div className="card">
          <Link to="/message">Message</Link>
        </div>
      <div className='data-section'>
        <h2>Recent Dispensed Medications</h2>
        <ul>
          {dispensedMedications.map(medication => (
            <li key={medication.id}>
              <strong>Medication:</strong> {medication.medication}<br />
              <strong>Dosage:</strong> {medication.dosage}<br />
              <strong>Patient:</strong> {medication.patient}<br />
              <strong>Dispensed at:</strong> {medication.timestamp.toLocaleString()}<br />
            </li>
          ))}
        </ul>
      </div>

      <div className='data-section'>
        <h2>Recent Messages</h2>
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <strong>{message.sender}: </strong>{message.text}<br />
              <strong>Sent at:</strong> {message.timestamp.toLocaleString()}<br />
            </li>
          ))}
        </ul>
      </div>

      <div className='data-section'>
        <h2>Medication History</h2>
        <ul>
          {medicationHistory.map(history => (
            <li key={history.id}>
              <strong>Medication:</strong> {history.medication}<br />
              <strong>Dosage:</strong> {history.dosage}<br />
              <strong>Patient:</strong> {history.patient}<br />
              <strong>Timestamp:</strong> {history.timestamp.toLocaleString()}<br />
            </li>
          ))}
        </ul>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar
            data={medicationHistoryData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Pharmacy;



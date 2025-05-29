
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './MedicationReminder.css';

const MedicationReminder = () => {
  const [reminderText, setReminderText] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [remindersList, setRemindersList] = useState([]);

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setRemindersList(savedReminders);
  }, []);

  const handleSetReminder = () => {
    if (reminderText.trim() === '' || reminderTime.trim() === '') {
      toast.error("Please fill all fields.");
      return;
    }

    const newReminder = {
      text: reminderText,
      time: reminderTime,
      createdAt: new Date().toLocaleString()
    };

    const updatedReminders = [...remindersList, newReminder];
    setRemindersList(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    setReminderText('');
    setReminderTime('');

    toast.success("✅ Reminder Set Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="reminder-container">
      <h2 className="reminder-heading">💊 Set Medication Reminder</h2>

      <input
        type="text"
        placeholder="e.g. Take Vitamin D"
        value={reminderText}
        onChange={(e) => setReminderText(e.target.value)}
        className="reminder-input"
      />

      <input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="reminder-input"
      />

      <button onClick={handleSetReminder} className="reminder-button">Set Reminder</button>

      {/* Show List */}
      <div className="reminders-list">
        <h3>Upcoming Reminders</h3>
        {remindersList.length === 0 ? (
          <p>No reminders set yet.</p>
        ) : (
          remindersList
            .sort((a, b) => new Date(a.time) - new Date(b.time)) // sort by time
            .map((item, index) => (
              <div key={index} className="reminder-card">
                <p>📝 {item.text}</p>
                <small>⏰ Scheduled for: {new Date(item.time).toLocaleString()}</small>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MedicationReminder;

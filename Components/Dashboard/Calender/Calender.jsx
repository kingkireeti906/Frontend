import React, { useState } from "react";
import CalendarComponent from 'react-calendar'; // aliasing the imported Calendar component
import styles from './Calender.module.css';

function MyCalendar({ onSelectDueDate, selectedDate }) { // renaming the functional component and accepting onSelectDueDate prop
    const [value, onChange] = useState(selectedDate ? new Date(selectedDate) : new Date());
    console.log(selectedDate)
    // Function to format the date as "MM/DD/YYYY"
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const handleTodayClick = () => {
        const today = new Date();
        onChange(today);
        onSelectDueDate(today);
    };

    const handleClearClick = () => {
        onChange(null);
        onSelectDueDate(null);
    };

    // Function to handle selecting a date from the calendar
    const handleSelectDate = (date) => {
        onChange(date); // Update the selected date
        onSelectDueDate(date); // Pass the selected date to the parent component
    };

    return (
        <div className={styles.calendar}>
            <CalendarComponent onChange={handleSelectDate} value={value} className={styles.custom} />
            <div className={styles.buttons}>
                <span onClick={handleTodayClick} className={styles.clear}>Today</span>
                <span onClick={handleClearClick} className={styles.save}>Clear</span>
            </div>
            <p>{value ? formatDate(value) : 'Select a date'}</p>
        </div>
    );
}

export default MyCalendar;
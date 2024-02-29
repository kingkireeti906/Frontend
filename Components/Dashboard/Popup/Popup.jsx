import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './Popup.module.css';
import MyCalendar from '../Calender/Calender';
import { create } from '../../../Apis/board';

function PopUp({ onClose,onSave}) {
    const [checkedCount, setCheckedCount] = useState(0);
    const [inputFields, setInputFields] = useState([]);
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [checklist, setChecklist] = useState("");
 

    const [data, setdata] = useState({
        title: "",
        priority: "",
        checklist: "",
        dueDate: "",
    });

    const handleShowCalendar = () => {
        setShowCalendar(true);
    };

    const handleSelectPriority = (priority) => {
        setSelectedPriority(priority);
    };

    const handleSelectDueDate = (date) => {
        setSelectedDueDate(date);
        setDueDate(date);
        setShowCalendar(false);
    };

    const addInputField = () => {
        const newInputFields = [
            ...inputFields,
            { id: inputFields.length + 1, value: '', checked: false },
        ];
        setInputFields(newInputFields);
    };

    const handleChange = (id, event) => {
        const newInputFields = inputFields.map(field => {
            if (field.id === id) {
                return { ...field, value: event.target.value };
            }
            return field;
        });
        setInputFields(newInputFields);

        const newChecklist = newInputFields.map(field => field.value).filter(Boolean).join(', ');
        setChecklist(newChecklist);
    };

    const handleCheckboxChange = (id, checked) => {
        const newInputFields = inputFields.map(field => {
            if (field.id === id) {
                return { ...field, checked };
            }
            return field;
        });
        setInputFields(newInputFields);
        setCheckedCount(newInputFields.filter(field => field.checked).length);
    };

    const handleDelete = id => {
        const newInputFields = inputFields.filter(field => field.id !== id);
        setInputFields(newInputFields);
        setCheckedCount(newInputFields.filter(field => field.checked).length);

        const newChecklist = newInputFields.map(field => field.value).filter(Boolean).join(', ');
        setChecklist(newChecklist);
    };

    const handleClosePopup = () => {
        onClose();
        handleSave();
    };

    // const handleSave = async() => {
    //     const savedData = {
    //         title: data.title,
    //         priority: selectedPriority,
    //         checklist: checklist,
    //         dueDate: dueDate ? dueDate.toLocaleDateString('en-US') : "",

    //     };
    //     console.log(savedData);
    //     const response= await create({...savedData})
    //     console.log(response.data);
    //     onSave(savedData)
    //     onClose()


    // };
    const handleSavePopup = async () => {
               
        const checkedInputFields = inputFields.filter(field => field.checked); // Filter out checked input fields
        const checklisted = checkedInputFields.map(field => field.value); 
     const vp = checklisted;
     
        const savedData = {
            title: data.title,
            priority: selectedPriority,
            checklist: checklist,
            dueDate: dueDate ? dueDate.toLocaleDateString('en-US') :null,
            vp:checklisted
        };
        console.log(savedData);
    
        const response = await create({...savedData});
      
    
    console.log(`vp is ${vp}`);
        // Call onSave prop if available
        if (onSave) {
            onSave();
        }
    
        // Close the popup
        onClose();
    };
    
  
    

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container}>
                <span className={styles.title}>Title<span className={styles.asterisk}>*</span></span>
                <input type='text' placeholder='Enter Task Title' className={styles.taskTitle} value={data.title} onChange={(e) => setdata({ ...data, title: e.target.value })} />
                <div className={styles.priorityBox}>
                    <span className={styles.priority}>Select Priority<span className={styles.asterisk}>*</span></span>
                    <div className={`${styles.prior} ${selectedPriority === 'HIGH PRIORITY' && styles.selectedPrior}`} name='priority' onClick={() => { handleSelectPriority('HIGH PRIORITY') }}>
                        <span className={styles.highPriority}></span>
                        <span className={styles.hp}>HIGH PRIORITY</span>
                    </div>
                    <div className={`${styles.prior} ${selectedPriority === 'MODERATE PRIORITY' && styles.selectedPrior}`} name='priority' onClick={() => { handleSelectPriority('MODERATE PRIORITY') }}>
                        <span className={styles.mp}></span>
                        <span className={styles.hp}>MODERATE PRIORITY</span>
                    </div>
                    <div className={`${styles.prior} ${selectedPriority === 'LOW PRIORITY' && styles.selectedPrior}`} name='priority' onClick={() => { handleSelectPriority('LOW PRIORITY') }}>
                        <span className={styles.lp}></span>
                        <span className={styles.hp}>LOW PRIORITY</span>
                    </div>
                </div>
                <div className={styles.checklist}>Checklist ({checkedCount}/{inputFields.length})<span className={styles.asterisk}>*</span></div>
                <div className={styles.inputContainer}>
                    {inputFields.length > 3 ? (
                        <div className={styles.inputContainerScroll}>
                            {inputFields.map(field => (
                                <div key={field.id} className={styles.inputfieldsBox}>
                                    <input
                                        type="checkbox"
                                        checked={field.checked}
                                        onChange={e => handleCheckboxChange(field.id, e.target.checked)}
                                        
                                        className={styles.checkBox}
                                    />
                              
                                    <input
                                        type='text'
                                        placeholder='Add a task'
                                        value={field.value}
                                        onChange={e => handleChange(field.id, e)}
                                        className={styles.input}
                                    />
                                    <FaTrash onClick={() => handleDelete(field.id)} className={styles.dltIcon} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        inputFields.map(field => (
                            <div key={field.id} className={styles.inputfieldsBox}>
                                <input
                                    type="checkbox"
                                    checked={field.checked}
                                    onChange={e => handleCheckboxChange(field.id, e.target.checked)}
                                    className={styles.checkBox}
                                />
                                <input
                                    type='text'
                                    placeholder='Add a task'
                                    value={field.value}
                                    onChange={e => handleChange(field.id, e)}
                                    className={styles.input}
                                />
                                <FaTrash onClick={() => handleDelete(field.id)} className={styles.dltIcon} />
                            </div>
                        ))
                    )}
                </div>
                <span onClick={addInputField} className={styles.add}>+ Add New</span>
                <div className={styles.buttons}>
                    <button className={styles.date} onClick={() => setShowCalendar(true)}>
                        {dueDate ? dueDate.toLocaleDateString('en-US') : "Select Due Date"}
                    </button>
                    <div>
                        <button className={styles.cancel} onClick={handleClosePopup}>Cancel</button>
                        <button className={styles.save} onClick={() => { handleSavePopup(); handleClosePopup(); }}>Save</button>
                    </div>
                </div>
                {showCalendar && (
                    <div className={styles.calendar_container}>
                        <div className={styles.calendar_wrapper}>
                            <MyCalendar onSelectDueDate={handleSelectDueDate} selectedDate={selectedDueDate} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PopUp;
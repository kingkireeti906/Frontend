import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './Editpopup.module.css';
import MyCalendar from '../Calender/Calender';
import { updateEditData} from '../../../Apis/board';

function EditpopUp({ editData, onClose, vp,_id }) {
  const [checkedCount, setCheckedCount] = useState(0);
  const [inputFields, setInputFields] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [checklist, setChecklist] = useState("");
  const [savedData, setSavedData] = useState(null);

  const [oldData, setOldData] = useState({});
  console.log(`olddata  ${JSON.stringify(oldData)}`);

  useEffect(() => {
    if (editData) {
      setOldData({
        title: editData.title || "",
        priority: editData.priority || null,
        checklist: Array.isArray(editData.checklist)
          ? editData.checklist.map((value) => ({ value, checked: true }))
          : [],
        dueDate: editData.dueDate || null,
        vp: Array.isArray(editData.vp) ? [...editData.vp] : [],
      });
      setSelectedPriority(editData.priority || null);
    }
  }, [editData]);

  useEffect(() => {
    if (editData && Array.isArray(oldData.vp)) {
      const vpValues = oldData.vp;

      console.log('VP Values:', vpValues);

      // Initialize the checklist items based on vp values
      const newInputFields = oldData.checklist.map((item, index) => {
        const checked = vpValues.includes(item.value.trim());

        console.log(`Checking: VP Value - ${item.value}, Checked - ${checked}`);

        return {
          ...item,
          id: index + 1,
          checked,
        };
      });

      setCheckedCount(newInputFields.filter((field) => field.checked).length);
      setInputFields(newInputFields);
      setChecklist(
        newInputFields.map((field) => field.value).filter(Boolean).join(', ')
      );
    }
  }, [editData, oldData.vp, oldData.checklist]);

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleClosePopup = () => {
    // Save the changes before closing, if needed
    handleSavePopup();
    // Close the EditpopUp component by invoking the onClose prop
    onClose();
  };

  const handleSelectPriority = (priority) => {
    const newSelectedPriority = priority === oldData.priority ? null : priority;
    setSelectedPriority(newSelectedPriority);

    // Update the savedData state with the new priority
    setSavedData({
      ...savedData,
      priority: newSelectedPriority,
    });
  };

  const handleSelectDueDate = (date) => {
    setSelectedDueDate(date);
    setDueDate(date); // Set the dueDate state when the user selects a due date
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
    const newInputFields = inputFields.map((field) => {
      if (field.id === id) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setInputFields(newInputFields);

    const newChecklist = newInputFields
      .map((field) => field.value)
      .filter(Boolean)
      .join(', ');
    setChecklist(newChecklist);
  };

  const handleCheckboxChange = (id, checked) => {
    const newInputFields = inputFields.map((field) => {
      if (field.id === id) {
        return { ...field, checked };
      }
      return field;
    });
    setInputFields(newInputFields);
    setCheckedCount(newInputFields.filter((field) => field.checked).length);
  };

  const handleDelete = (id) => {
    const newInputFields = inputFields.filter(
      (field) => field.id !== id
    );
    setInputFields(newInputFields);
    setCheckedCount(
      newInputFields.filter((field) => field.checked).length
    );

    const newChecklist = newInputFields
      .map((field) => field.value)
      .filter(Boolean)
      .join(', ');
    setChecklist(newChecklist);
  };
 // Runs when count or data changes

 const handleSavePopup = async () => {
  try {
    // Save the changes made by the user
    const newSavedData = {
      title: oldData.title || editData.title,
      priority: selectedPriority || oldData.priority,
      checklist: inputFields
        .map((field) => field.value.trim())
        .filter(Boolean)
        .join(','),
      dueDate: dueDate || oldData?.dueDate || null, // Use the updated dueDate state
      vp: inputFields
        .filter((field) => field.checked)
        .map((field) => field.value.trim()),
    };

    setSavedData(newSavedData);
    console.log(`date is ${savedData?.dueDate}`);
    const response = await updateEditData({ _id }, { ...newSavedData });
    console.log('API response:', response);
  } catch (error) {
    console.error('Error while preparing data:', error);
  }
};


  

  
  
  return (
    <div className={styles.overlay}>
      <div className={styles.popup_container}>
        <span className={styles.title}>
          Title
          <span className={styles.asterisk}>*</span>
        </span>
        <input
          type='text'
          placeholder='Enter Task Title'
          className={styles.taskTitle}
          value={oldData.title}
          onChange={(e) =>
            setOldData({
              ...oldData,
              title: e.target.value,
            })
          }
        />
        <div className={styles.priorityBox}>
          <span className={styles.priority}>
            Select Priority
            <span className={styles.asterisk}>*</span>
          </span>
          <div
  className={`${styles.prior} ${
    (selectedPriority || oldData.priority) === 'HIGH PRIORITY' &&
    styles.selectedPrior
  }`}
  name='priority'
  onClick={() => {
    handleSelectPriority('HIGH PRIORITY');
  }}
>
  <span className={styles.highPriority}></span>
  <span className={styles.hp}>HIGH PRIORITY</span>
</div>
<div
  className={`${styles.prior} ${
    (selectedPriority || oldData.priority) === 'MODERATE PRIORITY' &&
    styles.selectedPrior
  }`}
  name='priority'
  onClick={() => {
    handleSelectPriority('MODERATE PRIORITY');
  }}
>
  <span className={styles.mp}></span>
  <span className={styles.hp}>MODERATE PRIORITY</span>
</div>
<div
  className={`${styles.prior} ${
    (selectedPriority || oldData.priority) === 'LOW PRIORITY' &&
    styles.selectedPrior
  }`}
  name='priority'
  onClick={() => {
    handleSelectPriority('LOW PRIORITY');
  }}
>
  <span className={styles.lp}></span>
  <span className={styles.hp}>LOW PRIORITY</span>
</div>

        </div>
        <div className={styles.checklist}>
          Checklist ({checkedCount}/{inputFields.length})
          <span className={styles.asterisk}>*</span>
        </div>
        <div className={styles.inputContainer}>
          {inputFields.length > 3 ? (
            <div className={styles.inputContainerScroll}>
              {inputFields.map((field) => (
                <div
                  key={field.id}
                  className={styles.inputfieldsBox}
                >
                  <input
                    type='checkbox'
                    checked={field.checked}
                    {...(vp?.includes(field.value.trim()) && { checked: true })}
                    onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
                    className={styles.checkBox}
                  />

                  <input
                    type='text'
                    placeholder='Add a task'
                    value={field.value}
                    onChange={(e) =>
                      handleChange(field.id, e)
                    }
                    className={styles.input}
                  />
                  <FaTrash
                    onClick={() =>
                      handleDelete(field.id)
                    }
                    className={styles.dltIcon}
                  />
                </div>
              ))}
            </div>
          ) : (
            inputFields.map((field) => (
              <div
                key={field.id}
                className={styles.inputfieldsBox}
              >
                <input
                  type='checkbox'
                  checked={field.checked}
                  onChange={(e) =>
                    handleCheckboxChange(
                      field.id,
                      e.target.checked
                    )
                  }
                  className={styles.checkBox}
                />
                <input
                  type='text'
                  placeholder='Add a task'
                  value={field.value}
                  onChange={(e) =>
                    handleChange(field.id, e)
                  }
                  className={styles.input}
                />
                <FaTrash
                  onClick={() => handleDelete(field.id)}
                  className={styles.dltIcon}
                />
              </div>
            ))
          )}
        </div>
        <span onClick={addInputField} className={styles.add}>
          + Add New
        </span>
        <div className={styles.buttons}>
        <button
  className={styles.date}
  onClick={() => setShowCalendar(true)}
>
  {selectedDueDate
    ? new Date(selectedDueDate).toLocaleDateString('en-US')
    : oldData?.dueDate
      ? new Date(oldData.dueDate).toLocaleDateString('en-US')
      : 'Select Due Date'}
</button>


          <div>
            <button
              className={styles.cancel}
              onClick={handleClosePopup}
            >
              Cancel
            </button>
            <button
              className={styles.save}
              onClick={() => {
                handleSavePopup(_id);
                handleClosePopup();
              }}
            >
              Save
            </button>
          </div>
        </div>
        {showCalendar && (
          <div className={styles.calendar_container}>
            <div className={styles.calendar_wrapper}>
              <MyCalendar
                onSelectDueDate={handleSelectDueDate}
                selectedDate={selectedDueDate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditpopUp;

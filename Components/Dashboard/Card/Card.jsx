import { useState, useEffect } from 'react';
import styles from './Card.module.css';
import dots from '../../../src/assets/Icons/dots.png';
import down from '../../../src/assets/Icons/down.jpeg';
import up from '../../../src/assets/Icons/up.jpeg';
import { updatesection } from '../../../Apis/board';
import Delete from '../Delete/Delete';
import {getUserData} from '../../../Apis/board';
import EditpopUp from '../Editpopup/Editpopup';

function Card({ priority, title, id, checklistItems, dueDate, vp, onMoveToBacklog, onMoveToInProgress, onMoveToDone, updateChecklist }) {
    const formattedDueDate = dueDate ? formatDate(dueDate) : null;

    const [showChecklist, setShowChecklist] = useState(false);
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [data, setupdate] = useState({ id: '', newsection: '' });
    const [arrowimage,setArrow]=useState(down);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [editData, setEditData] = useState([]);
    const [edit ,setEdit]= useState(false);
    const handleeditClick=async (_id)=>{
        setEdit(true);
        const response =await getUserData(_id);
        setEditData(response.data)
        console.log(editData)
    }
    const handleDelete = () => {
        // Perform delete operation here
        setShowDeletePopup(false); // Hide delete popup after deletion
      };
 
      const handleCancelDelete = () => {
        setShowDeletePopup(false); // Hide delete popup if cancelled
      };
 
    const handleOptionClick = (option) => {
        // Handle option click here
        console.log(option);
        if (option === 'Delete') {
            setShowOptions(false); 
            setShowDeletePopup(true); // Show delete popup when delete option is clicked
          }
    };
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };


    const changesection = (id, newsection) => {
        setupdate({
            ...data,
            id: id,
            newsection: newsection
        });
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await updatesection({...data});
                console.log(response);
            } catch (error) {
                console.error("Error updating section:", error);
            }
        };
    
        fetchData();
    }, [data]);
    const handleCloseEditPopup = () => {
        setEdit(false); // Set edit to false to hide the EditpopUp component
        setShowOptions(false); // Set showOptions to false when EditpopUp is closed
    };

    useEffect(() => {
        // Set default checked items only when the component mounts
        const defaultCheckedItems = checklistItems.filter(item => vp.includes(item.trim()));
        setCheckedItems(new Set(defaultCheckedItems));
        setCheckedCount(defaultCheckedItems.length);
    }, [vp, checklistItems]);

    const toggleChecklist = () => {
        setShowChecklist(!showChecklist);
        setArrow(showChecklist ? down : up);
    };

    // const handleCheckboxChange = (item) => {
    //     // This function will handle user interaction with checkboxes
    //     const isChecked = checkedItems.has(item);

    //     if (!isChecked) {
    //         setCheckedItems((prev) => new Set([...prev, item]));
    //         setCheckedCount((prev) => prev + 1);
    //         updateChecklist((prev) => prev + 1);
    //     } else {
    //         setCheckedItems((prev) => {
    //             const newSet = new Set(prev);
    //             newSet.delete(item);
    //             return newSet;
    //         });
    //         setCheckedCount((prev) => prev - 1);
    //         updateChecklist((prev) => prev - 1);
    //     }
    // };

    function formatDate(dueDate) {
        if (!dueDate) {
            return ''; // Handle null or undefined dueDate
        }

        // Parse the backend date format
        const parsedDueDate = new Date(dueDate);

        // Get the month abbreviation
        const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'short' }).format(parsedDueDate);

        // Get the day with suffix
        const day = parsedDueDate.getDate();
        let dayWithSuffix;

        if (day >= 11 && day <= 13) {
            dayWithSuffix = `${day}th`;
        } else {
            switch (day % 10) {
                case 1:
                    dayWithSuffix = `${day}st`;
                    break;
                case 2:
                    dayWithSuffix = `${day}nd`;
                    break;
                case 3:
                    dayWithSuffix = `${day}rd`;
                    break;
                default:
                    dayWithSuffix = `${day}th`;
            }
        }

        return `${monthAbbreviation} ${dayWithSuffix}`;
    }

    let colorClass;
    switch (priority) {
        case 'HIGH PRIORITY':
            colorClass = styles.highPriorityColor;
            break;
        case 'MODERATE PRIORITY':
            colorClass = styles.moderatePriorityColor;
            break;
        case 'LOW PRIORITY':
            colorClass = styles.lowPriorityColor;
            break;
        default:
            colorClass = '';
    }

    // Determine if the due date has passed
    const isDueDatePassed = dueDate ? new Date(dueDate) < new Date() : false;

    return (
        <div className={styles.card}>
           
            <div className={styles.cardHeader}>
                <div className={styles.subcard}>
                {showOptions && (
                    <div className={styles.options}>
                        <div onClick={() => handleeditClick(id)} className={styles.edit}>Edit</div>
                        <div onClick={() => handleOptionClick('Share')} className={styles.share}>Share</div>
                        <div onClick={() => handleOptionClick('Delete')} className={styles.delete}>Delete</div>
                       
                    </div>
                )}
                </div>
           
                <div className={`${styles.color} ${colorClass}`}></div>
                <span className={styles.priority}>{priority}</span>
                <img src={dots} alt='dots_icon' className={styles.dots} onClick={toggleOptions} />
            </div>
            <span className={styles.title}>{title}</span>
            <div className={styles.checklist}>
                <div className={styles.arrow}>
                    <p className={styles.checklistTitle}>Checklist ({checkedCount}/{checklistItems ? checklistItems.length : 0})</p>
                    <div>
                        <img src={arrowimage} alt='down_arrow_icon' className={styles.down} onClick={toggleChecklist} />
                    </div>
                </div>
                {showChecklist && (
    <div className={styles.checklistItems}>
        {checklistItems.map((item, index) => (
            <div key={index} className={styles.inputfieldsBox}>
                <input
                    type="checkbox"
                    className={styles.checkBox}
                    id={`checkbox-${index}`}
                    checked={vp.includes(item.trim())}  // Check if the item is in vp
                    
                />
                <span className={styles.input}>{item}</span>
            </div>
        ))}
    </div>
)}

            </div>
            <div className={styles.cardFooter}>
                {formattedDueDate && (
                    <button className={`${styles.dueDate} ${isDueDatePassed ? styles.dueDateRed : ''}`}>
                        {formattedDueDate}
                    </button>
                )}
                <div className={styles.sectionButtons}>

                    <button onClick={() => changesection(id, 'Backlog')} className={styles.backlog}>Backlog</button>
                    <button onClick={() => changesection(id, 'In progress')} className={styles.inProgress}>Progress</button>

                    <button onClick={() => changesection(id, 'Done')} className={styles.done}>Done</button>

                </div>
                {showDeletePopup && <Delete onCancel={handleCancelDelete} onDelete={handleDelete} _id={id}/>}
                {edit && <EditpopUp editData={editData}onClose={handleCloseEditPopup}vp={vp} _id={id} />}
            </div>
        </div>
    );
}

export default Card;

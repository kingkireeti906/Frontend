import { useState ,useEffect} from 'react';
import styles from './Card.module.css';
import dots from '../../../src/assets/Icons/dots.jpeg';
import down from '../../../src/assets/Icons/down.jpeg';
import up from '../../../src/assets/Icons/up.jpeg';
 
function Card({ priority, title, checklistItems, dueDate, vp,onMoveToBacklog, onMoveToInProgress, onMoveToDone,updateChecklist }) {
    const formattedDueDate = dueDate ? formatDate(dueDate) : null;
    
    const [showChecklist, setShowChecklist] = useState(false);
    const [arrowImage, setArrowImage] = useState(down);
    const [checkedCount, setCheckedCount] = useState(0); // State to keep track of checked checkboxes count
    const [manuallyChecked, setManuallyChecked] = useState(new Set());
 
 
    const toggleChecklist = () => {
        setShowChecklist(!showChecklist);
        setArrowImage(showChecklist ? down : up);
    };
 
    const handleCheckboxChange = (item) => {
        const isChecked = vp.includes(item); // Check if the item is in the vp array
        if (!isChecked && !manuallyChecked.has(item)) {
            // Add to manuallyChecked set if it's not in vp array and not already manually checked
            setManuallyChecked(prev => new Set([...prev, item]));
            setCheckedCount(prev => prev + 1);
        } else if (isChecked && manuallyChecked.has(item)) {
            // Remove from manuallyChecked set if it's in vp array and manually checked
            setManuallyChecked(prev => {
                const newSet = new Set(prev);
                newSet.delete(item);
                return newSet;
            });
            setCheckedCount(prev => prev - 1);
        } else if (isChecked && !manuallyChecked.has(item)) {
            // If it's in vp array but not manually checked, do nothing
            return;
        } else {
            // If it's not in vp array and already manually checked, remove from manuallyChecked and update count
            setManuallyChecked(prev => {
                const newSet = new Set(prev);
                newSet.delete(item);
                return newSet;
            });
            setCheckedCount(prev => prev - 1);
        }
        updateChecklist(isChecked ? checkedCount : checkedCount + 1);
    };
 
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

    useEffect(() => {
        let initialCheckedCount = 0;
        checklistItems.forEach(item => {
            if (vp.includes(item)) {
                initialCheckedCount++;
                  // Add to manuallyChecked set if it's not in vp array
                  if (!vp.includes(item)) {
                    setManuallyChecked(prev => new Set([...prev, item]));
                }
            }
        });
        setCheckedCount(initialCheckedCount);
    }, [checklistItems, vp]);
    
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={`${styles.color} ${colorClass}`}></div>
                <span className={styles.priority}>{priority}</span>
                <img src={dots} alt='dots_icon' className={styles.dots} />
            </div>
            <span className={styles.title}>{title}</span>
            <div className={styles.checklist}>
                <div className={styles.arrow}>
                <p className={styles.checklistTitle}>Checklist ({checkedCount}/{checklistItems ? checklistItems.length : 0})</p>

                    <div>
                        <img src={arrowImage} alt='down_arrow_icon' className={styles.down} onClick={toggleChecklist} />
                    </div>
                </div>
                {showChecklist && (
                    <div className={styles.checklistItems}>
                        {checklistItems.map((item, index) => {
                            const isChecked = vp.includes(item);
                            return (
                                <div key={index} className={styles.inputfieldsBox}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkBox}
                                        id={`checkbox-${index}`}
                                        onChange={() => handleCheckboxChange(item)}
                                        checked={isChecked || manuallyChecked.has(item)}
                                    />
                                    <input
                                        type='text'
                                        value={item}
                                        className={styles.input}
                                    />
                                </div>
                            );
                        })}
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
                    <button onClick={onMoveToBacklog} className={styles.backlog}>Backlog</button>
                    <button onClick={onMoveToInProgress} className={styles.inProgress}>Progress</button>
                    <button onClick={onMoveToDone} className={styles.done}>Done</button>
                </div>
            </div>
        </div>
    );
}
 
export default Card;
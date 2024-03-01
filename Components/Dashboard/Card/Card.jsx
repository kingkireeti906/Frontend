import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updatesection, updatevp } from '../../../Apis/board';
import Delete from '../Delete/Delete';
import EditpopUp from '../Editpopup/Editpopup';
import { getUserData } from '../../../Apis/board';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import dots from '../../../src/assets/Icons/dots.png';
import down from '../../../src/assets/Icons/down.jpeg';
import up from '../../../src/assets/Icons/up.jpeg';

function Card({ priority, title, id, checklistItems, dueDate, vp, currentSection, isCollapsed }) {
  const formattedDueDate = dueDate ? formatDate(dueDate) : null;
  const naviagte = useNavigate();

  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState(new Set(vp.map(item => item.trim())));
  const [data, setUpdate] = useState({ id: '', newsection: '' });
  const [arrowImage, setArrow] = useState(down);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [editData, setEditData] = useState([]);
  const [edit, setEdit] = useState(false);

  const baseURL = 'https://kingkireeti906.github.io/Frontend/';

  const handlesharelink = (id) => {
    const url = `${baseURL}#/card/${id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Card Link copied', {
          autoClose: 1000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error('Failed to copy the URL to the clipboard:', error);
        toast.error('Failed to copy the Card Link', {
          autoClose: 1000,
          hideProgressBar: true,
        });
      });
  };

  const handleeditClick = async (_id) => {
    setEdit(true);
    const response = await getUserData(_id);
    setEditData(response.data);
  };

  const handleDelete = () => {
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleOptionClick = (option) => {
    if (option === 'Delete') {
      setShowOptions(false);
      setShowDeletePopup(true);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const changesection = async (id, newsection) => {
    try {
      await setUpdate({
        ...data,
        id: id,
        newsection: newsection,
      });

      setTimeout(() => {
        handleRefreshClick();
      }, 1000);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await updatesection({ ...data });
        console.log(response);
      } catch (error) {
        console.error('Error updating section:', error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (isCollapsed) {
      setShowChecklist(false);
      setArrow(down);
    }
  }, [isCollapsed]);

  const handleCloseEditPopup = () => {
    setEdit(false);
    setShowOptions(false);
  };

  useEffect(() => {
    setCheckedCount(checkedItems.size);
  }, [checkedItems]);

  const handleCheckboxChange = async (item) => {
    const updatedCheckedItems = new Set(checkedItems);

    if (updatedCheckedItems.has(item)) {
      updatedCheckedItems.delete(item);
    } else {
      updatedCheckedItems.add(item);
    }

    try {
      const response = await updatevp({ id }, Array.from(updatedCheckedItems));
      console.log(response);
    } catch (error) {
      console.error('Error updating vp:', error);
    }

    setCheckedItems(updatedCheckedItems);
  };

  const toggleChecklist = () => {
    setShowChecklist(!showChecklist);
    setArrow(showChecklist ? down : up);
  };

  function formatDate(dueDate) {
    if (!dueDate) {
      return '';
    }

    const parsedDueDate = new Date(dueDate);
    const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'short' }).format(parsedDueDate);
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

  const isDueDatePassed = dueDate ? new Date(dueDate) < new Date() : false;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.subcard}>
          {showOptions && (
            <div className={styles.options}>
              <div onClick={() => handleeditClick(id)} className={styles.edit}>
                Edit
              </div>
              <div onClick={() => handlesharelink(id)} className={styles.share}>
                Share
              </div>
              <div onClick={() => handleOptionClick('Delete')} className={styles.delete}>
                Delete
              </div>
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
            <img src={arrowImage} alt='down_arrow_icon' className={styles.down} onClick={toggleChecklist} />
          </div>
        </div>
        {showChecklist && (
          <div className={styles.checklistItems}>
            {checklistItems.map((item, index) => (
              <div key={index} className={styles.inputfieldsBox}>
                <input
                  type='checkbox'
                  className={styles.checkBox}
                  id={`checkbox-${index}`}
                  checked={checkedItems.has(item.trim())}
                  onChange={() => handleCheckboxChange(item.trim())}
                />
                <span className={styles.input}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        {formattedDueDate && currentSection !== 'Done' && (
          <button className={`${styles.dueDate} ${isDueDatePassed ? styles.dueDateRed : ''}`}>{formattedDueDate}</button>
        )}
        {formattedDueDate && currentSection === 'Done' && (
          <button className={`${styles.dueDate} ${isDueDatePassed ? styles.dueDateRed : styles.dueDateGreen}`}>
            {formattedDueDate}
          </button>
        )}

        {currentSection === 'Backlog' && (
          <div className={styles.sectionButtons}>
            <button className={styles.inProgress} onClick={() => changesection(id, 'In progress')}>
              PROGRESS
            </button>
            <button className={styles.todo} onClick={() => changesection(id, 'To do')}>
              TO-DO
            </button>
            <button className={styles.done} onClick={() => changesection(id, 'Done')}>
              DONE
            </button>
          </div>
        )}
        {currentSection === 'To do' && (
          <div className={styles.sectionButtons}>
            <button className={styles.backlog} onClick={() => changesection(id, 'Backlog')}>
              BACKLOG
            </button>
            <button className={styles.inProgress} onClick={() => changesection(id, 'In progress')}>
              PROGRESS
            </button>
            <button className={styles.done} onClick={() => changesection(id, 'Done')}>
              DONE
            </button>
          </div>
        )}
        {currentSection === 'In Progress' && (
          <div className={styles.sectionButtons}>
            <button className={styles.backlog} onClick={() => changesection(id, 'Backlog')}>
              BACKLOG
            </button>
            <button className={styles.todo} onClick={() => changesection(id, 'To do')}>
              TO-DO
            </button>
            <button className={styles.done} onClick={() => changesection(id, 'Done')}>
              DONE
            </button>
          </div>
        )}
        {currentSection === 'Done' && (
          <div className={styles.sectionButtons}>
            <button className={styles.backlog} onClick={() => changesection(id, 'Backlog')}>
              BACKLOG
            </button>
            <button className={styles.todo} onClick={() => changesection(id, 'To do')}>
              TO-DO
            </button>
            <button className={styles.inProgress} onClick={() => changesection(id, 'In progress')}>
              PROGRESS
            </button>
          </div>
        )}

        {showDeletePopup && <Delete onCancel={handleCancelDelete} onDelete={handleDelete} _id={id} />}
        {edit && <EditpopUp editData={editData} onClose={handleCloseEditPopup} vp={vp} _id={id} />}
      </div>
    </div>
  );
}

export default Card;

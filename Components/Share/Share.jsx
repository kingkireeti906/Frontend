import React, { useState, useEffect } from 'react';
import styles from './Share.module.css';
import proManageIcon from '../../src/assets/Icons/codesandbox.png';
import { getshareData } from '../../Apis/board';
import { useParams } from 'react-router-dom';

const Share = () => {
  const [data, setData] = useState({
    title: "",
    checklist: [],
    vp: [],
    dueDate: "",
    priority: '',
  });

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getshareData(id);
      const { title, priority, checklist, vp, dueDate } = response.data;
      const checkedItems = new Set(vp.filter((item) => checklist.includes(item.trim())));

      setData({
        title,
        priority,
        checklist,
        vp,
        dueDate,
      });
      setCheckedCheckboxes(checkedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
    return formattedDate.replace(/\d+/, day) + suffix;
  };

  let colorClass;
  switch (data.priority) {
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

  const [checkedCheckboxes, setCheckedCheckboxes] = useState(new Set(data.vp));

  const handleCheckboxChange = (item) => {
    const updatedCheckedCheckboxes = new Set(checkedCheckboxes);

    if (updatedCheckedCheckboxes.has(item)) {
      updatedCheckedCheckboxes.delete(item);
    } else {
      updatedCheckedCheckboxes.add(item);
    }

    setCheckedCheckboxes(updatedCheckedCheckboxes);
  };

  const totalCheckboxes = data.checklist.length;
  const checkedCount = checkedCheckboxes.size;

  const dueDate = new Date(data.dueDate);
  const currentDate = new Date();
  const isDueDatePassed = dueDate < currentDate;

  return (
    <div className={styles.shareContainer}>
      <div className={styles.promanage}>
        <img src={proManageIcon} alt="promanage_icon" className={styles.promanageIcon} />
        <p className={styles.promanage_text}>Pro Manage</p>
      </div>
      {data && (
        <div className={styles.shareBox}>
          <div className={styles.priorityBox}>
            <div className={`${styles.color} ${colorClass}`}></div>
            <p className={styles.priority}>{data.priority}</p>
          </div>
          <span className={styles.title}>{data.title}</span>
          <p className={styles.checklistTitle}>Checklist ({checkedCount}/{totalCheckboxes})</p>

          <div className={styles.checklistItems}>
            {data.checklist?.map((item, index) => (
              <div key={index} className={styles.inputfieldsBox}>
                <input
                  type="checkbox"
                  className={styles.checkBox}
                  id={`checkbox-${index}`}
                  onChange={() => handleCheckboxChange(item)}
                  checked={checkedCheckboxes.has(item)}
                />
                <input type="text" value={item} className={styles.input} />
              </div>
            ))}
          </div>
          <div className={styles.dueDateBox}>
            <p className={styles.date}>Due Date</p>
            <button className={`${styles.dueDate} ${isDueDatePassed ? styles.dueDateRed : ''}`}>
              {getFormattedDate(data.dueDate)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;

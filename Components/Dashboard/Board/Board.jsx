import { useState,useEffect } from 'react';
import React from 'react';
import styles from './Board.module.css';
import collapseIcon from '../../../src/assets/Icons/collapse.png'
import plus from '../../../src/assets/Icons/popup.png';
import Popup from '../Popup/Popup';
import { getdata } from '../../../Apis/board';
import Card from '../Card/Card';


function Board() {
    const username = localStorage.getItem('username');
    const [selectedOption, setSelectedOption] = useState('week');
    const [popup, setPopup] = useState(false);
    const [cards, setCards] = useState([]);
    const [Backlogcards, BacklogsetCards] = useState([]);
    const [Inprogresscards, InprogresssetCards] = useState([]);
    const [Donecards, DonesetCards] = useState([]);
    const [todoCollapsed, setTodoCollapsed] = useState(false);
    const [backlogCollapsed, setBacklogCollapsed] = useState(false); 
    const [progressCollapse, setProgressCollapse] = useState(false); 
    const [doneCollapse, setDoneCollapse] = useState(false);

    const [vpdata,setvpdata]= useState([]);
  
    
   
    // Function to format the date as "12th Jan, 2024"
    const getFormattedDate = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        // Function to add ordinal suffix to the day
        const getOrdinalSuffix = (day) => {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const ordinalSuffix = getOrdinalSuffix(day);
        return `${day}${ordinalSuffix} ${month}, ${year}`;
    };

    const handleClose = () => {
        setPopup(false);
      };
      
  const handleClick = () => {
    setPopup(true);
  };
  

    const handleSaveData=(vp)=>{
        setvpdata(vp);
      

    }
    

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
   
    const fetching = async () => {
        try {
            const response = await getdata(selectedOption, "To do");
            
    
           
    
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // Directly set the state with the array
                setCards(prevCards => {
                   
                    const updatedCards = response.data.data;
               
                    return updatedCards;
                });
                
            } else {
                console.error("Invalid response format. Expected an array.", response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    const fetching2 = async () => {
        try {
            const response = await getdata(selectedOption, "Backlog");
            
    
          


    
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // Directly set the state with the array
                BacklogsetCards(prevCards => {
                    // console.log("Previous Cards:", prevCards);
                    const updatedCards = response.data.data;
                    // console.log("Updated Cards:", updatedCards);
                    return updatedCards;
                });
                
            } else {
                console.error("Invalid response format. Expected an array.", response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetching3 = async () => {
        try {
            const response = await getdata(selectedOption, "In progress");
            
    
          
    
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // Directly set the state with the array
                InprogresssetCards(prevCards => {
                    // console.log("Previous Cards:", prevCards);
                    const updatedCards = response.data.data;
                    // console.log("Updated Cards:", updatedCards);
                    return updatedCards;
                });
                
            } else {
                console.error("Invalid response format. Expected an array.", response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetching4 = async () => {
        try {
            const response = await getdata(selectedOption, "Done");
            
    
            // console.log("Full API Done response:", response);
    
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // Directly set the state with the array
                DonesetCards(prevCards => {
                    // console.log("Previous Cards:", prevCards);
                    const updatedCards = response.data.data;
                    console.log("Updated Cards:", updatedCards);
                    return updatedCards;
                });
                
            } else {
                console.error("Invalid response format. Expected an array.", response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    const toggleCollapseAll = () => {
        setTodoCollapsed(!todoCollapsed);
    };

    const toggleBacklogCollapse = () => {
        setBacklogCollapsed(!backlogCollapsed);
    };

    const toggleProgressCollapse = () => {
        setProgressCollapse(!progressCollapse);
    };

    const toggleDoneCollapse = () => {
        setDoneCollapse(!doneCollapse);
    };
    useEffect(() => {
        
      
    }, [cards]); // Log whenever 'cards' state changes
    
    useEffect(() => {
        fetching();
        fetching2();
        fetching3();
        fetching4();
    }, [selectedOption]);
    
  
    
  
    return (
        <div className={styles.boardContainer}>
            <p className={styles.welcome}>Welcome!{username}</p>
            <div className={styles.dateContainer}>
                <p className={styles.date}>{getFormattedDate()}</p>
            </div>
            <div className={styles.optionsContainer}>
                <span className={styles.head}>Board</span>
                <div className={styles.options}>
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
            </div>
            <div className={styles.sectionContainer}>
                <div className={styles.backlog}>
                    <div className={styles.headingSection}>
                        <p className={styles.heading}>Backlog</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse} onClick={toggleBacklogCollapse}/>
                       

                </div>
                <div className={styles.cardContainer}>
                    {Backlogcards.map((data, index) => {
 
    return (
        <Card
            key={index}
            priority={data.priority}
            title={data.title}
            checklistItems={data.checklist}
            dueDate={data.dueDate}
            vp={data.vp}
            id ={data._id}
            onMoveToBacklog={() => console.log('Move to backlog')}
            onMoveToInProgress={() => console.log('Move to in progress')}
            onMoveToDone={() => console.log('Move to done')}
            currentSection='Backlog'
            isCollapsed={backlogCollapsed}
        />
        
    );
})}
                    </div>
                </div>
                <div className={styles.todo}>
                    <div  className={styles.headingSection}>
                        <p className={styles.heading}>To do</p>
                        <img src={plus} alt='plus_icon' className={styles.plus} onClick={handleClick}/>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse}onClick={toggleCollapseAll} />
                    
                    </div>
                    <div className={styles.cardContainer}>
                    {cards.map((data, index) => {
 
    return (
        <Card
            key={index}
            priority={data.priority}
            title={data.title}
            checklistItems={data.checklist}
            dueDate={data.dueDate}
            vp={data.vp}
            id ={data._id}
            currentSection='To do'
            isCollapsed={todoCollapsed}

        />
        
    );
})}

                </div>
                </div>
                <div className={styles.inProgress}>
                    <div  className={styles.headingSection}>
                        <p className={styles.heading}>In progress</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse}onClick={toggleProgressCollapse} />
                    </div>
                    {Inprogresscards.map((data, index) => {
 
 return (
     <Card
         key={index}
         priority={data.priority}
         title={data.title}
         checklistItems={data.checklist}
         dueDate={data.dueDate}
         vp={data.vp}
         id ={data._id}
         onMoveToBacklog={() => console.log('Move to backlog')}
         onMoveToInProgress={() => console.log('Move to in progress')}
         onMoveToDone={() => console.log('Move to done')}
         currentSection="In Progress"
         isCollapsed={progressCollapse}
     />
     
 );
})}
                </div>
                <div className={styles.done}>
                    <div  className={styles.headingSection}>
                        <p className={styles.heading}>Done</p>
                        <img src={collapseIcon} alt='collapse_icon' className={styles.collapse}onClick={toggleDoneCollapse} />
                    </div>
                    {Donecards.map((data, index) => {
 
 return (
     <Card
         key={index}
         priority={data.priority}
         title={data.title}
         checklistItems={data.checklist}
         dueDate={data.dueDate}
         vp={data.vp}
         id ={data._id}
         onMoveToBacklog={() => console.log('Move to backlog')}
         onMoveToInProgress={() => console.log('Move to in progress')}
         onMoveToDone={() => console.log('Move to done')}
         currentSection="Done"
         isCollapsed={doneCollapse}

     />
     
 );
})}
                </div>
            </div>
            {popup && <Popup onClose={handleClose} onSave={handleSaveData} />}

        </div>
    );
}

export default Board;
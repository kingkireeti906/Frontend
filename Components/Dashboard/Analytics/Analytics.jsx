import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../../Apis/board';
import styles from './Analytics.module.css';

function Analytics() {
    const [data, setData] = useState({
        highPriority: '',
        lowPriority: '',
        moderatePriority: '',
        IncompleteDuetasks: '',
        Todo: '',
        Backlog: '',
        Done: '',
        Inprogress: '',
    });

    useEffect(() => {
        fetchJobDetails();
    }, []);

    const fetchJobDetails = async () => {
        try {
            const response = await getAnalytics();
            if (response) {
                console.log('Response:', response);
                setData(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p id={styles.sectionname}>Analytics</p>
            <div className={styles.container}>
                <div className={styles.leftblock}>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>Backlog Tasks</span>
                        <span id={styles.datacount}>{data.Backlog}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>To-do Tasks</span>
                        <span id={styles.datacount}>{data.Todo}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>In-Progress Tasks</span>
                        <span id={styles.datacount}>{data.Inprogress}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>Completed Tasks</span>
                        <span id={styles.datacount}>{data.Done}</span>
                    </div>
                </div>
                <div className={styles.rightblock}>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>Low Priority</span>
                        <span id={styles.datacount}>{data.lowPriority}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>Moderate Priority</span>
                        <span id={styles.datacount}>{data.moderatePriority}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>High Priority</span>
                        <span id={styles.datacount}>{data.highPriority}</span>
                    </div>
                    <div className={styles.ellipse}>
                        <span className={styles.serialno}></span>
                        <span id={styles.data}>Due Date Tasks</span>
                        <span id={styles.datacount}>{data.IncompleteDuetasks}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;

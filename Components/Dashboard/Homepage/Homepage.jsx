import { useState } from 'react';
import styles from './Homepage.module.css';
import proManageIcon from '../../../src/assets/Icons/codesandbox.png';
import boardIcon from '../../../src/assets/Icons/layout.png';
import analyticsIcon from '../../../src/assets/Icons/database.png';
import settingsIcon from '../../../src/assets/Icons/settings.png';
import logoutIcon from '../../../src/assets/Icons/Logout.png';
// import Board from '../Board/Board';
import Board from '../Board/Board';
import Analytics from '../Analytics/Analytics';
import Setting from '../settings/Setting';
import Logout from '../Logout/Logout';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState('Board');
  const [data, setdata] = useState(true);
  const [background, backgroundupdate] = useState(false);

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };
  const logout = () => {
    setdata(false);
    backgroundupdate(true);
  };
  const cancel = (message) => {
    setdata(message);
    backgroundupdate(false);
  };

  return (
    //     <div className={styles.maincontainer} style={background ? { backgroundColor: '#2F2F2FBF'} : {}}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.promanage}>
          <img src={proManageIcon} alt='promanage_icon' className={styles.promanageIcon} />
          <p className={styles.promanage_text}>Pro Manage</p>
        </div>
        <div
          className={`${styles.board} ${selectedComponent === 'Board' ? styles.selected : ''}`}
          onClick={() => handleComponentChange('Board')}
        >
          <img src={boardIcon} alt='board_icon' className={styles.board_icon} />
          <p className={`${styles.board_text} ${selectedComponent === 'Board' ? styles.selectedText : ''}`}>Board</p>
        </div>
        <div
          className={`${styles.analytics} ${selectedComponent === 'Analytics' ? styles.selected : ''}`}
          onClick={() => handleComponentChange('Analytics')}
        >
          <img src={analyticsIcon} alt='analytics_icon' className={styles.analyticsIcon} />
          <p className={`${styles.analytics_text} ${selectedComponent === 'Analytics' ? styles.selectedText : ''}`}>Analytics</p>
        </div>
        <div
          className={`${styles.settings} ${selectedComponent === 'Settings' ? styles.selected : ''}`}
          onClick={() => handleComponentChange('Settings')}
        >
          <img src={settingsIcon} alt='settings_icon' className={styles.settingsIcon} />
          <p className={`${styles.settings_text} ${selectedComponent === 'Settings' ? styles.selectedText : ''}`}>Settings</p>
        </div>
        <div className={styles.logout}>
          <img src={logoutIcon} alt='Logout_Icon' className={styles.logoutIcon} onClick={logout} />
          <p className={styles.logout_text} onClick={logout}>
            Logout
          </p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {selectedComponent === 'Board' && <Board />}
        {selectedComponent === 'Analytics' && <Analytics />}
        {selectedComponent === 'Settings' && <Setting />}
      </div>
      {!data && <Logout cancellation={cancel} />}
    </div>
    // </div>
  );
}

export default Homepage;

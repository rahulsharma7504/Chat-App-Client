import React, { useEffect } from 'react';
import styles from '../../Styles/Home.module.css';
import ChatBox from './ChatBox';
import Model from '../Chunks/Model';
import { useGroup } from '../../Context/GroupContext';

const Group = () => {
  const { getGroupInfo, getGroups, groupData, startGroupChat } = useGroup();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)._id;
      getGroups(userId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar: Hidden on smaller screens */}
          <div className="d-none d-md-block col-md-4 col-12">
            <Model />
            {groupData?.findGroup?.length > 0 || groupData?.findUserInGroup?.length > 0 ? (
              <>
                <div className={styles.inlineContent}></div>
                <hr />
                <ul className={styles.userList}>
                  <hr className={styles.verticalLine} />
                  {groupData.findGroup.map((user) => (
                    <li key={user._id} className={styles.userItem} onClick={() => getGroupInfo(user._id)}>
                      <div className={styles.userInfo}>
                        <img src={user.image} alt={user.name} className={styles.userImage} />
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{user.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                  {groupData.findUserInGroup.map((group) => (
                    <li key={group._id} className={styles.userItem} onClick={() => getGroupInfo(group._id)}>
                      <div className={styles.userInfo}>
                        <img src={group.image} alt={group.name} className={styles.userImage} />
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{group.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No Groups found.</p>
            )}
          </div>

          {/* ChatBox: Always visible */}
          <div className="col-md-8 col-12">
            {startGroupChat && <ChatBox chatUser={startGroupChat} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;

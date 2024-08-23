import React, { useEffect, useState } from 'react';
import axios from 'axios';
import URL from '../Chunks/URL';
import styles from '../../Styles/Home.module.css';
import Swal from 'sweetalert2';
import ChatBox from './ChatBox';
import Model from '../Chunks/Model'
const Group = () => {
  const [startGroupChat, setStartGroupChat] = useState(null);
  const [groupData, setGroupsData] = useState({
    findGroup: [],
    findUserInGroup: []
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)._id;
      getGroups(userId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  async function getGroups(userId) {
    try {
      const response = await axios.get(`${URL.Endpoint}/groups/${userId}`);
      setGroupsData(response.data.data);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  }


  const getGroupInfo = async (id) => {
    try {
      const res = await axios.post(`${URL.Endpoint}/group/info`, { id });
      setStartGroupChat(res.data.findGroup);
    } catch (error) {
      Swal.fire({
        title: 'Oops! Something went wrong',
        icon: 'warning',
        confirmButtonText: 'Okay'
      })
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-12">
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
                        <img
                          src={user.image}
                          alt={user.name}
                          className={styles.userImage}
                        />
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{user.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                  {groupData.findUserInGroup.map((group) => (
                    <li key={group._id} className={styles.userItem} onClick={() => getGroupInfo(group._id)}>
                      <div className={styles.userInfo}>
                        <img
                          src={group.image}
                          alt={group.name}
                          className={styles.userImage}
                        />
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
          <div className="col-md-8 col-12">
            {startGroupChat && <ChatBox chatUser={startGroupChat} />}

          </div>


        </div>


      </div>



    </>
  );
};

export default Group;

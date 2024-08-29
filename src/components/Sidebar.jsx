import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Image, Text, Divider } from '@chakra-ui/react';
import { useChat } from '../Context/ChatUser';
import { useGroup } from '../Context/GroupContext';
import ChatBox from './Group/ChatBox';
import Home from './Pages/Home'; // Import your Home component
import Group from './Group/Group'; // Import your Group component
import { useTabContext } from '../Context/TabsContext';
const Sidebar = ({ drawerOpen }) => {
  const { activeTab, setActiveTab } = useTabContext();

  const handleTabChange = (index) => {
    setActiveTab(index === 0 ? 'user' : 'group');
  };

  // Use for Group Data And Chat
  const { getGroupInfo, getGroups, groupData, startGroupChat, setStartGroupChat, setGroupsData } = useGroup();

  // This for the user Data to Fetch functions
  const { chatUser, usersData, messages, getUserInfo } = useChat();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  // State for active tab

  return (
    <Box display="flex">
      {/* Sidebar Drawer */} 
      <Box id="myDrawer" className={`drawer ${drawerOpen ? 'open' : ''}`} width="20%">
        {/* Tab Header */}
        <Tabs variant="soft-rounded" colorScheme="teal" index={activeTab === 'user' ? 0 : 1} onChange={handleTabChange}>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Groups</Tab>
          </TabList>

          <TabPanels>
            {/* Users Tab Panel */}
            <TabPanel>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" color="white">Users</Text>
              <Divider mb={4} />

              {/* Show All Users List */}
              {usersData ? (
                <Box as="ol" listStyleType="none" p={0}>
                  {usersData.map((user) => (
                    <Box as="li" key={user._id} onClick={() => getUserInfo(user._id)} className="user-item" display="flex" alignItems="center" mb={3} p={3} bg="gray.700" borderRadius="md" cursor="pointer" _hover={{ bg: 'gray.600' }}>
                      <Image src={user.image} alt={user.name} className="user-image" borderRadius="full" boxSize="40px" mr={3} />
                      <Box className="user-info">
                        <Text className="user-name" color="white" fontWeight="bold">{user.name}</Text>
                        {user.is_online && <Text className="user-status" color="green.300" fontSize="sm">Online</Text>}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text color="white">No User Found</Text>
              )}
            </TabPanel>

            {/* Groups Tab Panel */}
            <TabPanel>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" color="white">Groups</Text>
              <Divider mb={4} />

              {/* Display list of groups - Replace with your group data */}
              {groupData.findGroup || groupData.findUserInGroup ? (
                <Box as="ol" listStyleType="none" p={0}>
                  {groupData.findGroup.map((user) => (
                    <Box as="li" key={user._id} onClick={() => getGroupInfo(user._id)} className="user-item" display="flex" alignItems="center" mb={3} p={3} bg="gray.700" borderRadius="md" cursor="pointer" _hover={{ bg: 'gray.600' }}>
                      <Image src={user.image} alt={user.name} className="user-image" borderRadius="full" boxSize="40px" mr={3} />
                      <Box className="user-info">
                        <Text className="user-name" color="white" fontWeight="bold">{user.name}</Text>
                        {user.is_online && <Text className="user-status" color="green.300" fontSize="sm">Online</Text>}
                      </Box>
                    </Box>
                  ))}
                  {groupData.findUserInGroup.map((user) => (
                    <Box as="li" key={user._id} onClick={() => getGroupInfo(user._id)} className="user-item" display="flex" alignItems="center" mb={3} p={3} bg="gray.700" borderRadius="md" cursor="pointer" _hover={{ bg: 'gray.600' }}>
                      <Image src={user.image} alt={user.name} className="user-image" borderRadius="full" boxSize="40px" mr={3} />
                      <Box className="user-info">
                        <Text className="user-name" color="white" fontWeight="bold">{user.name}</Text>
                        {user.is_online && <Text className="user-status" color="green.300" fontSize="sm">Online</Text>}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text color="white">No Groups Found</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs> 
      </Box>

      {/* Main Content Shift with Sidebar */}
      <Box className={`main-content ${drawerOpen ? 'shift' : ''}`} width="80%">
        {/* Render Home or Group based on the activeTab state */}
        {/* {activeTab === 'home' ? <Home /> : <Group />} */}
      </Box>
    </Box>
  );
};

export default Sidebar;

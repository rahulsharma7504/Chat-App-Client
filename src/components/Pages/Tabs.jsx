import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Icon } from "@chakra-ui/react";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import Home from './Home';
import Groups from './Groups';
import { useTabContext } from '../../Context/TabsContext';
const Tabspanel = () => {
  const { activeTab, setActiveTab } = useTabContext();


  const handleTabChange = (index) => {
    setActiveTab(index === 0 ? 'user' : 'group');
  };
  return (
    <>

      <Box mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Tabs variant="soft-rounded" colorScheme="purple"  index={activeTab === 'user' ? 0 : 1} onChange={handleTabChange}>
          <TabList>
            <Tab>
              <Icon as={FaUsers} mr={2} />
              Users
            </Tab>
            <Tab>
              <Icon as={FaUserFriends} mr={2} />
              Groups
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box bg="gray.50" p={4} borderRadius="md">
                <Home />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg="gray.50" p={4} borderRadius="md">
                <Groups />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default Tabspanel

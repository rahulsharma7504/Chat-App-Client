import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Icon } from "@chakra-ui/react";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import Home from './Home';
import Groups from './Groups';

const Tabspanel = () => {
    return (
        <>

<Box mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Tabs variant="soft-rounded" colorScheme="purple">
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
                <Home/>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box bg="gray.50" p={4} borderRadius="md">
                <Groups/>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
        </>
    )
}

export default Tabspanel

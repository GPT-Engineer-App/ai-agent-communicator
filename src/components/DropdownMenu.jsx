import React, { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const DropdownMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login functionality
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    setIsLoggedIn(false);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaUser />}>
        {isLoggedIn ? "Account" : "Login"}
      </MenuButton>
      <MenuList>
        {isLoggedIn ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
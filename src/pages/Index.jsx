import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import DropdownMenu from "../components/DropdownMenu";

const Index = () => {
  return (
    <Flex minWidth="max-content" alignItems="center" justifyContent="flex-end" p={2}>
      <Spacer />
      <DropdownMenu />
    </Flex>
  );
};

export default Index;

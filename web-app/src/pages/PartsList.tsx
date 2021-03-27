import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { PartListDisplay } from "../components/PartList/PartListDisplay";
import { WithNavbar } from "../components/WithNavbar";

const NavItems = ["mold", "category", "imm", "material"];

export const PartsList = () => {
  const [listType, setListType] = useState("mold");
  const [searchInput, setSearchInput] = useState("");
  const [searchRegExp, setSearchRegExp] = useState(new RegExp(""));

  useEffect(() => {
    setSearchRegExp(new RegExp(searchInput, "gi"));
  }, [searchInput, setSearchRegExp]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <WithNavbar
      navItems={NavItems}
      menuSelector={(item) => setListType(item)}
      selectedItem={listType}
    >
      <InputGroup colorScheme="blue">
        <InputLeftElement pointerEvents="none">
          <FaSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search.."
          focusBorderColor="blue.500"
          errorBorderColor="blue.300"
          value={searchInput}
          onChange={handleSearchChange}
          isInvalid
        />
      </InputGroup>
      <Box flex={1} overflowY="scroll">
        <PartListDisplay variant={listType} search={searchRegExp} />
      </Box>
    </WithNavbar>
  );
};

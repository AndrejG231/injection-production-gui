import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Input, Button, Spacer } from "@chakra-ui/react";

import {
  setEditMode,
  setEditValue,
  setMatSelMode,
} from "../../redux/SourceManagement/Actions";

import { ReduxStoreT } from "../../redux/reduxStore";
import { createCookie, clearCookie } from "../../utilities/manageCookie";
import { useMaterials } from "../../data/hooks";
import { DataError, DataLoading } from "../DataHandlers";

const EditForm: FC = () => {
  const materials = useMaterials();
  const dispatch = useDispatch();
  const { editData } = useSelector((state: ReduxStoreT) => ({
    editData: state.sourceManagement.editValues,
  }));
  const [oldName] = useState(editData.name);

  if (!materials || materials === "loading") {
    return <DataLoading />;
  }

  if (materials === "error") {
    return <DataError />;
  }

  return (
    <Flex direction="column" m="10px" align="center" h="90%">
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Name"
        value={editData.name}
        onChange={(event) => dispatch(setEditValue("name", event.target.value))}
      />
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        mb="5px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Material"
        value={
          editData.material.startsWith("@m-")
            ? materials[editData.material.slice(3)].slice(0, 15) + "..."
            : editData.material
        }
        onChange={(event) =>
          dispatch(setEditValue("material", event.target.value))
        }
      />
      <Button
        fontSize="20px"
        w="60%"
        h="40px"
        mb="10px"
        mr="10px"
        ml="auto"
        colorScheme="teal"
        onClick={() => dispatch(setMatSelMode(true))}
      >
        Select
      </Button>
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Info"
        value={editData.info}
        onChange={(event) => dispatch(setEditValue("info", event.target.value))}
      />
      <Button
        h="50px"
        mt="15px"
        w="80%"
        fontSize="22px"
        colorScheme="red"
        onClick={() => {
          clearCookie(`@mat-${oldName}`);
          dispatch(setEditMode(false));
        }}
      >
        Remove
      </Button>
      <Spacer />
      <Button
        h="50px"
        mb="10px"
        w="80%"
        fontSize="22px"
        colorScheme="yellow"
        onClick={() => dispatch(setEditMode(false))}
      >
        Cancel
      </Button>
      <Button
        fontSize="22px"
        h="50px"
        w="80%"
        colorScheme="green"
        onClick={() => {
          clearCookie(`@mat-${oldName}`);
          createCookie(
            `@mat-${editData.name}`,
            `${editData.material}@info@${editData.info}`
          );
          dispatch(setEditMode(false));
        }}
      >
        Save
      </Button>
    </Flex>
  );
};

export default EditForm;

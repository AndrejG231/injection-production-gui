import React, { FC, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { Box } from "@chakra-ui/react";

import { WithNavbar } from "../components/WithNavbar";
import PlansEdit from "../components/Plans/PlansEdit";
import PlanSetter from "../components/Plans/PlanSetter";

import { editValuesT } from "../redux/Plans/Reducer";
import { storeEdits } from "../redux/Plans/Actions";
import { ReduxStoreT } from "../redux/reduxStore";
import Visual from "../components/Plans/Visual";
import MaterialFlow from "../components/Plans/MaterialFlow";

const navItems = ["visual", "flow", "manage"];

const StateToProps = (state: ReduxStoreT) => {
  return {
    editMode: state.plans.editMode,
    plans: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return { updateCookie: () => dispatch(storeEdits()) };
};

interface PlansProps {
  editMode: boolean;
  plans: editValuesT[];
  updateCookie: () => void;
}

const Plans: FC<PlansProps> = ({ editMode, plans, updateCookie }) => {
  const [navigation, setNavigation] = useState(navItems[0]);

  if (editMode) {
    return <PlansEdit />;
  }

  return (
    <WithNavbar
      navItems={navItems}
      selectedItem={navigation}
      menuSelector={(item) => setNavigation(item)}
    >
      <Box overflowY="auto" flex={1}>
        {navigation === "manage" ? <PlanSetter /> : null}
        {navigation === "visual" ? <Visual /> : null}
        {navigation === "flow" ? <MaterialFlow /> : null}
      </Box>
    </WithNavbar>
  );
};

export default connect(StateToProps, DispatchToProps)(Plans);

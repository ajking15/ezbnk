import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Grid,
  Input,
  Modal,
  Spacer,
  Switch,
  Text,
  Textarea,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Calendar, Download, Send, Upload } from "react-iconly";
import Navybar from "../common/components/navbar";
import { RequestModal } from "../common/components/modals/requestModal";
import { ReviewModal } from "../common/components/modals/reviewModal";
import { RequestCard } from "../common/components/cards/requestCard";

const Request = () => {
  const [toggleRequest, setToggleRequest] = useState(false);
  const [toggleRequestAccept, setToggleRequestAccept] = useState(false);
  //
  const [selectRequested, setRequested] = useState({});
  const userInfo = require("../common/db/user.json");
  // Updated //
  const [updateRequest, setUpdateRequest] = useState(false);
  const reviewCards = (requests) => {
    const cards = [];
    requests.map((data, i) => {
      cards.push(<>
        <RequestCard type={typeof data.to == 'undefined' ? 'Recieved' : 'Sent' } data={data} key={i} toggle={toggleRequestAccept} setToggle={setToggleRequestAccept} setData={setRequested} />
        <Spacer /></>
      );
    });
    return cards;
  };
  return (
    <>
      <div style={{ marginLeft: "16%", marginTop: "3%" }}>
        {" "}
        <Button
          onClick={() => {
            setToggleRequest(!toggleRequest);
          }}
        >
          Request Friend
        </Button>
        <RequestModal toggle={toggleRequest} setToggle={setToggleRequest} requestMode="lend"/>
        <ReviewModal toggle={toggleRequestAccept} setToggle={setToggleRequestAccept} data={selectRequested} />
        <Spacer />
        <Text h2>Loan</Text>
        <Divider style={{ width: "80%" }} />
        <div style={{ marginTop: "2%", display: "flex", flexDirection: "row" }}>
          {reviewCards(userInfo.request.lend)}
        </div>
        <Spacer />
        <Text h2>Transfer</Text>
        <Divider style={{ width: "80%" }} />
        <div style={{ marginTop: "2%", display: "flex", flexDirection: "row" }}>
          {reviewCards(userInfo.request.transfer)}
        </div>
        <Spacer />
        <Text h2>Sent</Text>
        <Divider style={{ width: "80%" }} />
        <div style={{ marginTop: "2%", display: "flex", flexDirection: "row" }}>
          {reviewCards(userInfo.send)}
        </div>
      </div>
    </>
  );
};

export default Request;

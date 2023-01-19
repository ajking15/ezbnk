import {
  Modal,
  Button,
  Dropdown,
  Switch,
  Text,
  Divider,
  Input,
  Textarea,
  User,
  Checkbox,
  Spacer,
} from "@nextui-org/react";
import { useMemo, useReducer, useState } from "react";
import { Calendar, Download, Send } from "react-iconly";

const initalSetup = {
  type: "lend",
  shared: false, 
  lenderChoice: false, 
  transferType: false,
}

const reducer = (state, action) => {}
export const RequestModal = (props) => {
  const [requestMode, setRequestMode] = useState("lend");
  const [transferType, setTransferType] = useState(false);
  const [setup, changeSetup] = useReducer(reducer, initalSetup);
  //
  const [requestFriend, setRequestFriend] = useState(new Set([]));
  const [compoundSelect, setCompoundSelect] = useState("Interval");
  const [requestAmount, setRequestAmount] = useState(0);
  const [lenderChoice, setLenderChoice] = useState(false);
  const [sharedTransfer, setSharedTransfer] = useState(false);
  const [requestInterestMin, setRequestInterestMin] = useState(0.0);
  const [requestInterestMax, setRequestInterestMax] = useState(0.0);
  const [dueDate, setDueDate] = useState("00/00/0000");
  const [shareType, setShareType] = useState("");
  const [description, setDescription] = useState("This is sample description");
  //
  const rawFriends = require("../../db/friends.json");
  const rawIntervals = require("../../db/globals.json").intervals;
  const rawShareType = require("../../db/globals.json").shareType;

  const buildRequest = () => {
   return requestMode == "transfer" ? 
    {
      "to": requestFriend,
      "amount": requestAmount,
      "type": requestMode,
      "description": description
  }
  : {
    "to": requestFriend,
    "amount": requestAmount,
    "type": requestMode,
    "description": description,
    "min": requestInterestMin,
    "max": requestInterestMax,
    "due": dueDate

}
  }
  const selectedValue = useMemo(
    () => Array.from(requestFriend,uid => rawFriends[uid].name).join(", "),
    [rawFriends, requestFriend]
  );
  return (
    <Modal style={{transition: "all"}} width="70%" open={props.toggle} blur>
      <Modal.Header>
        <div>
          <div style={{ marginBottom: "-10%", marginRight: "-10%" }}>
            <Button.Group size="sm" rounded>
              <Button
                flat={requestMode != "lend"}
                onClick={() => {
                  setSharedTransfer(false);
                  setRequestFriend(new Set([]))
                  setRequestMode("lend")}}
              >
                Lend
              </Button>
              <Button
                flat={requestMode != "transfer"}
                onClick={() => {
                  setLenderChoice(false)
                  setRequestFriend(new Set([]))
                  setRequestMode("transfer")}}
              >
                Transfer
              </Button>
            </Button.Group>
            {requestMode == "transfer" && (
              <div style={{ marginLeft: "100%", marginTop: "-20%" }}>
                {/*Send/Recieve*/}
                <Switch
                  color="success"
                  onChange={() => setTransferType(!transferType)}
                  iconOn={<Download set="light" primaryColor="black" />}
                  iconOff={<Send set="light" primaryColor="black" />}
                />
              </div>
            )}
          </div>
          <Text size={20}>
            {requestMode == "lend"
              ? "Request Friend"
              : transferType != true
              ? "Send Money"
              : "Request Money"}
          </Text>
          {requestMode == "lend" ? (
            <div
              style={{
                marginTop: "-10%",
              }}
            >
              <Checkbox
                size="xs"
                isSelected={lenderChoice}
                onChange={() => {
                  setLenderChoice(!lenderChoice);
                }}
              >
                {"Lender's Choice"}
              </Checkbox>
            </div>
          ) :  <div
          style={{
            marginTop: "-10%",
          }}
        >
          <Checkbox
            size="xs"
            isSelected={sharedTransfer}
            onChange={() => {
              setRequestFriend(new Set([]))
              setSharedTransfer(!sharedTransfer);
            }}
          >
            {"Shared"}
          </Checkbox>
        </div>}
        </div>
      </Modal.Header>
      {console.log("new size",requestFriend.size)}
      <Modal.Body css={{ display: "flex", flexDirection: "column" }}>
        <Divider style={{ marginTop: "-3%" }} />
        <Text>Friend</Text>
        <Dropdown>
          <Dropdown.Button flat>{requestFriend.size < 1 ? "Friend" : selectedValue}</Dropdown.Button>
          <Dropdown.Menu
            aria-label="Static Actions"
            selectionMode={sharedTransfer ? "multiple" : "single"}
            selectedKeys={requestFriend}
            onSelectionChange={
              setRequestFriend}
            items={Object.values(rawFriends)}
          >
            {(item) => (
              <Dropdown.Item
                key={item.uid}
                command={item.lendScore}
                icon={<User size="sm" src={item.src} />}
              >
                {item.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Input
          type="number"
          labelLeft="$"
          label={"Amount"}
          onChange={(e) => {
            setRequestAmount(e.target.value);
          }}
        />
        {console.log(Object.values(rawShareType))}
        {
          sharedTransfer && <div><Divider color="warning"/><div><Text>Share Type</Text>
          <Dropdown>
            <Dropdown.Button flat color="success">{shareType != "" ? shareType : "Type"}</Dropdown.Button>
            <Dropdown.Menu selectionMode="single" aria-label="Dynamic-Actions" items={Object.values(rawShareType)} onSelectionChange={(e) => setShareType(rawShareType[e.currentKey].label)}>
              {(item) => (
                <Dropdown.Item
                key={item.key}
                icon={item.icon
                }
                description={item.description}
                >
                  {item.label}
                </Dropdown.Item>
              )
              }
            </Dropdown.Menu>
          </Dropdown></div><Spacer /><div><Checkbox label="Include you" color="success" size="sm" /></div><Divider color="warning" /></div>
        }
            {lenderChoice == true || requestMode != "transfer" && (
              <>
              <Text>Variable Interest Rate (VIR)</Text>
                <div
                  style={{
                    display: "flex",
                    flex: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Input
                    width={"30%"}
                    type="number"
                    labelRight="%"
                    label="Minimum Rate"
                    onChange={(e) => {
                      setRequestInterestMin(e.target.value);
                    }}
                  />
                  <Input
                    width={"30%"}
                    type="number"
                    labelRight="%"
                    label="Maximum Rate"
                    onChange={(e) => {
                      setRequestInterestMax(e.target.value);
                    }}
                  />
                </div>
                <Input
                  helperColor="primary"
                  type="date"
                  labelLeft={<Calendar set="light" primaryColor="black" />}
                  label="Due Date"
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />
                <Text>Compounding</Text>
                <Dropdown>
                  <Dropdown.Button flat>{compoundSelect}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    selectionMode="single"
                    selectedKeys={compoundSelect}
                    onSelectionChange={(e) => setCompoundSelect(e.currentKey)}
                    items={rawIntervals}
                  >
                    {(item) => (
                      <Dropdown.Item key={item.title}>
                        {item.title}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
        <Textarea label="Notes" placeholder="Enter your description" onChange={setDescription}/>
        <Divider />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color={"error"}
          onClick={() => props.setToggle(false)}
        >
          Cancel
        </Button>
        <Button
          auto
          onClick={() => {
            console.log(buildRequest())
          }}
        >
          {requestMode == "lend"
            ? "Request"
            : transferType != true
            ? "Send"
            : "Request"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

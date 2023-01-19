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
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Calendar } from "react-iconly";

export const ReviewModal = (props) => {
    const [updateRequest, setUpdateRequest] = useState(false);
    const [compoundSelect, setCompoundSelect] = useState("Interval");
    const [requestFriend, setRequestFriend] = useState("Friend");
    const [requestAmount, setRequestAmount] = useState(props.data.amount);
    const [requestInterestMin, setRequestInterestMin] = useState(props.data.min);
    const [requestInterestMax, setRequestInterestMax] = useState(props.data.max);
    const [dueDate, setDueDate] = useState(props.data.due);
    const [selectRequested, setRequested] = useState({});
    const rawIntervals = require("../../db/globals.json").intervals;
    
    useEffect(() => {
        setRequested(props.data);
        //setUpdateRequest(selectRequested.to !== 'undefined')
    }, [props.data, selectRequested]);
    
    return (
    <Modal closeButton aria-labelledby="modal-title" open={props.toggle} blur onClose={() => props.setToggle(false)}>
        <Modal.Header>
          <div
            style={{
              flex: "column",
            }}
          >
            <Text size={18}>Accept Request</Text>
            {(typeof selectRequested.min !== 'undefined' || typeof selectRequested.to !== 'undefined') && <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "-10%",
              }}
            >
             {selectRequested.to === 'undefined' && <Checkbox
                size="xs"
                defaultSelected={updateRequest}
                onChange={() => setUpdateRequest(!updateRequest)}
              >
                Update
              </Checkbox>}
            </div>}
          </div>
        </Modal.Header>
        <Modal.Body css={{ display: "flex", flexDirection: "column" }}>
          <Divider />
          <Input
            type="number"
            labelLeft="$"
            label="Requested amount"
            value={
              updateRequest == false ? selectRequested.amount : requestAmount
            }
            readOnly={updateRequest == false}
          />
          {typeof selectRequested.min !== 'undefined' && <><Text>Variable Interest Rate</Text><div
                    style={{
                        display: "flex",
                        flex: "row",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Text>{selectRequested?.min}</Text>
                    <Text>{"<"}</Text>
                    <Input
                        width={"50%"}
                        type="number"
                        labelRight="%"
                        value={updateRequest == false ? selectRequested?.min : requestInterestMin}
                        onChange={(e) => {
                            setRequestInterestMin(e.target.value);
                        } } />
                    <Text>{"<"}</Text>
                    <Text>{selectRequested.max}</Text>
                </div><Input
                        helperColor="primary"
                        type="date"
                        labelLeft={<Calendar set="light" primaryColor="grey" />}
                        label="Due Date"
                        value={updateRequest == false ? selectRequested.due : dueDate}
                        readOnly={!updateRequest} /><Text>Compounding</Text><Dropdown>
                        <Dropdown.Button flat>{compoundSelect}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Static Actions"
                            selectionMode="single"
                            selectedKeys={compoundSelect}
                            onSelectionChange={(e) => setCompoundSelect(e.currentKey)}
                            items={rawIntervals}
                        >
                            {(item) => (
                                <Dropdown.Item key={item.key}>{item.title}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown></>}
                    <Textarea label="Notes" value={selectRequested?.description} readOnly={updateRequest == false}/>
          <Divider />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color={"error"}
            onClick={() => {
              props.setToggle(false);
            }}
          >
            Decline
          </Button>
          <Button
            auto
            color={updateRequest ? "primary" : "success"}
            onClick={() => {
              console.log("Request Amount:", requestAmount);
              console.log("Min Request Interest:", requestInterestMin);
              console.log("Max Request Interest:", requestInterestMax);
              console.log("Due Date:", dueDate);
              console.log("Request Friend:", requestFriend);
              console.log("Coumpounding:", compoundSelect);
            }}
          >
            {typeof selectRequested.to === 'undefined' ? (updateRequest ? "Request" : "Accept") : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
      );
}
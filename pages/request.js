import { Button, Card, Dropdown, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";
import Navybar from "../common/components/navbar";

const Request = () => {
  const [toggle, setToggle] = useState(false);
  const requestCards = (numCards) => {
    const cards = [];
    for(var i = 0; i< numCards; i++){
        cards.push(<><Card css={{w: '10%'}}>
        <Card.Body>
            <Text>Request From: </Text>
            <Text>Requested Amount: </Text>
        </Card.Body>
        <Card.Footer>
            <Button auto color={'success'}>Accept</Button>
        </Card.Footer>
      </Card><Spacer /></>);
    }
    return cards;
  }
  return (
    <>
      <Navybar location="request" />
      <div style={{ marginLeft: "16%", marginTop: "3%" }}>
        {" "}
        <Button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Request Friend
        </Button>
        <Modal
          open={toggle}
          onClose={() => {
            setToggle(!toggle);
          }}
        >
          <Modal.Header>
            <Text>Request Friend</Text>
          </Modal.Header>
          <Modal.Body css={{ display: "flex", flexDirection: "column" }}>
            <Dropdown>
              <Dropdown.Button flat>Friends</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">Rob Stark</Dropdown.Item>
                <Dropdown.Item key="copy">Tirian Lanister</Dropdown.Item>
                <Dropdown.Item key="edit">Sansa Stark</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Input
              type={"number"}
              labelLeft="$"
              label="Request amount"
            />
            <Input
              type={"number"}
              labelLeft="%"
              label="Interest Rate"
            />
          </Modal.Body>
        </Modal>
        <div style={{marginTop: '2%', display: 'flex', flexDirection: 'row'}}>{requestCards(8)}</div>
       
      </div>
      
    </>
  );
};

export default Request;

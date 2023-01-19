import { Card, Divider, Text, Button } from "@nextui-org/react";

export const RequestCard = (props) => {
    return (
        <Card css={{ w: "20%" }}>
            <Card.Header>
                <Text>{props.type}</Text>    
            </Card.Header>
            <Divider/>
            <Card.Body>
              {typeof props.data.to == "undefined" ? <Text>{"From: " + props.data.from}</Text> : <Text>{"To: " + props.data.to}</Text>}
              <Text>{"Amount: $" + props.data.amount}</Text>
              {props.data.due && <Text>{"Due Data: " + props.data.due}</Text>}
            </Card.Body>
            <Card.Footer>
              <Button
                key={props.key}
                auto
                color={"warning"}
                onClick={() => {
                  props.setData(props.data);
                  props?.setToggle(!props.toggle);
                }}
              >
                Review
              </Button>
            </Card.Footer>
          </Card>
    );
}
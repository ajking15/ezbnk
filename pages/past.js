import { Card, Spacer, Text } from "@nextui-org/react";
import Navybar from "../common/components/navbar";

const Past = () => {
    const requestCards = (numCards) => {
        const cards = [];
        for(var i = 0; i< numCards; i++){
            cards.push(<><Card css={{w: '40%'}}>
            <Card.Body>
                <Text>Request From: </Text>
                <Text>Requested Amount: </Text>
            </Card.Body>
          </Card><Spacer /></>);
        }
        return cards;
      }
    return (<>
    <Navybar location='past'/>
    <div style={{marginTop: '5%', marginLeft:'16%'}}>{requestCards(8)}</div>
    past</>);
}
export default Past;
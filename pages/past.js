import { Card, Spacer, Text } from "@nextui-org/react";
import Navybar from "../common/components/navbar";

const Past = () => {
    const requests = [{
        from: 'Robert Baratheon',
        amount: '$234'
      },
      {
        from: 'Tyrion Lannister',
        amount: '$34'
      },
      {
        from: 'Daenerys Targaryen',
        amount: '$456'
      },
      {
        from: 'Arya Stark',
        amount: '$23'
      },
      {
        from: 'Rickon Stark',
        amount: '$678'
      },
      {
        from: 'Catelyn Stark',
        amount: '$23'
      },
    ];
    const requestCards = (numCards) => {
        const cards = [];
        for(var i = 0; i< numCards; i++){
            cards.push(<><Card css={{w: '40%'}}>
            <Card.Body>
            <Text>{'Request From: ' + requests[i]?.from}</Text>
            <Text>{'Requested Amount: ' + requests[i]?.amount}</Text>
            </Card.Body>
          </Card><Spacer /></>);
        }
        return cards;
      }
    return (<>
    {/* <Navybar location='past'/> */}
    <div style={{marginTop: '5%', marginLeft:'16%'}}>{requestCards(8)}</div>
    past</>);
}
export default Past;
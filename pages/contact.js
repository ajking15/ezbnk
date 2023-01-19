import { Button, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import Navybar from "../common/components/navbar";

const contact = () => {
    return (<>
    
    <div style={{display: 'flex', marginLeft: '30%', marginTop:  '5%', flexDirection: 'column', width: '40%'}}>
    <Text h1>Contact Us</Text>
        <Input placeholder="First Name" label="First Name"/>
        <Input label="Last Name" placeholder="Last Name" />
        <Input label="Email" placeholder="Email" />
        <Input label="Subject" placeholder="Subject" />
        <Textarea label='Description' placeholder="Description" maxRows={10} />
        <Spacer />
        <Button>Submit</Button>
    </div>
    </>);
}

export default contact;
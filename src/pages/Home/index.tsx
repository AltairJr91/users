import { useState } from "react";
import Header from "../../shared/components/Header"
import CreateUserModal from "../Modal/CreateUserModal";
import { Button, Card, CardBody, CardFooter, CardText } from 'react-bootstrap';

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    function handleModalOpen() {
        setShowModal(!showModal);
    }
    return (<>
        <Header />
        <Card className="container-md mt-4 ">
            <CardBody>
                <CardText className="text-center h3">Seja Parte da nossa comunidade se cadastre</CardText>
                
            </CardBody>
            <CardFooter className="me-2 text-center" >
                <Button className="mt-2 p-1 text-center" variant="primary" type="submit" onClick={handleModalOpen}> Crie seu usuario </Button>
            </CardFooter>
            <CardBody>
                <CreateUserModal showModal={showModal} setShowModal={setShowModal} />
            </CardBody>

        </Card>

    </>

    )
}

export default Home;
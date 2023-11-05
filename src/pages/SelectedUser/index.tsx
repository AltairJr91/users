import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../shared/components/Header";
import { useEffect, useState } from "react";
import UserModal from "../Modal/ManageUserModal";
import UserInterface from "../../shared/interfaces/UserInterface";
import Api from "../../shared/services/api/APIService";


const SelectedUser = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserInterface>();
    const navigate = useNavigate();
    useEffect(() => {
        Api().get(`/user/${id}`)
            .then((response) => {
                setSelectedUser(response.data.user);
            })
            .catch((error) => {
                console.log(error);
                window.alert("Erro: Usuario nao encontrado");
            });
        // eslint-disable-next-line
    }, []);

    function handleButton() {
        setShowModal(!showModal);
    }

    return (
        <div>
            <Header />
            <Card className="mt-2">
                <CardHeader>
                    <CardTitle>Usuario</CardTitle>
                </CardHeader>
                <CardBody>
                    {selectedUser && (
                        <>
                            <CardText>Nome: {selectedUser.name}</CardText>
                            <CardText>Email: {selectedUser.email}</CardText>
                            <CardText>Telefone: {selectedUser.phone}</CardText>
                        </>
                    )}
                </CardBody>
                <CardFooter>
                    <Button className="me-2" variant="primary" onClick={handleButton}>Gerenciar</Button>
                    <Button variant="warning" onClick={()=> navigate('/userList')}>Voltar</Button>
                </CardFooter>
            </Card>
            {selectedUser && (
                <UserModal selectedUser={selectedUser} showModal={showModal} setShowModal={setShowModal} />
            )}

        </div>
    );
};


export default SelectedUser;
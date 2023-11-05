import { useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Api from "../../shared/services/api/APIService";
import UserModalProps from "../../shared/interfaces/UserModalProps";



const UserModal = ({ selectedUser, showModal, setShowModal }: UserModalProps) => {

    const [name, setName] = useState(selectedUser.name);
    const [phone, setPhone] = useState(selectedUser.phone);
    const [email, setEmail] = useState(selectedUser.email);
   
    
    const handleDelete = (userId: string) => {
        Api().delete(`/user/${userId}`)
            .then((response) => {
              console.log("User Deleted Success");
              handleClose()
              window.alert('Usuário Deletado com sucesso!');
            })
            .catch((error) => {
              console.log(error);
              window.alert("User already deleted");
            });
        
    };
   
    
    const handleUpdate = (userId: string) => {
        Api().put(`/user/${userId}`, {
            name: name,
            phone: phone,
            email: email,
      
          })
            .then((response) => {
              console.log("User Update Success");
              setName('')
              setEmail('')
              setPhone('')
              handleClose()
              window.alert('Usuário Atualizado com sucesso!');
            })
            .catch((error) => {
              console.log(error);
              window.alert("User Update Error");
            });
    };

    const handleClose = () => {
        setShowModal(false);
    };


    return (

        <Modal show={showModal} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Informações de Usuario</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Insira o nome" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Insira o email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="Insira o telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="danger"onClick={() => handleDelete(selectedUser.id)}>Deletar</Button>
                <Button className="me-2" variant="primary" onClick={() => handleUpdate(selectedUser.id)}>Atualizar</Button>
            </ModalFooter>
        </Modal>
    );
};


export default UserModal;
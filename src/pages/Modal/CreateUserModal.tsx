import { Card, CardBody, CardHeader, CardTitle, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Api from '../../shared/services/api/APIService';


interface UserModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUserModal = ({ showModal, setShowModal }: UserModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit() {
   Api().post('/user', {
      name: name,
      phone: phone,
      email: email,

    })
      .then((response) => {
        console.log("User created");
        setName('')
        setPhone('')
        setEmail('')
        handleClose()
        window.alert('Usuário criado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        window.alert('Erro:Usuário ja existe!');
      });
  }

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>


      <Card className="container-p mt-1">
        <CardHeader>
          <CardTitle> Crie o seu Usuario! </CardTitle>
        </CardHeader>
        <CardBody>
          <Card.Title>Preencha os campos</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" required placeholder="Insira o nome" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email </Form.Label>
              <Form.Control type="email" required placeholder="Insira o email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" required placeholder="Insira o telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
          </Form>
          <Button className="me-2" variant="primary" type="submit" onClick={handleSubmit}>Criar</Button>
          <Button variant="warning" type="reset" onClick={handleClose} >Voltar</Button>
        </CardBody>
      </Card>
    </Modal>
  );
}

export default CreateUserModal;
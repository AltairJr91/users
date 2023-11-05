import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (

    <Card className="container-md text-center">
      <CardHeader>
        <CardTitle>404 - Página não encontrada</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          A página que você está procurando não existe.
        </CardText>

      </CardBody>
      <CardFooter>
        <Link to="/">Voltar para a página inicial</Link>
      </CardFooter>
    </Card>

  );
};

export default NotFound;
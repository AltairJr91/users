import Header from '../../shared/components/Header';
import { Card, CardHeader, CardBody, CardFooter, Dropdown, CardSubtitle, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Api from '../../shared/services/api/APIService';
import UserInterface from '../../shared/interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const UsersList = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  useEffect(() => {
    Api().get('/user')
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        
      })

  }, [])

  const navigate = useNavigate();
  // Funçao para seleção de usuario na tabela por id
  const handleRowClick = (user: UserInterface) => {
    navigate(`/userList/${user.id}`);
  };
  //funçao para pesquisa via formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Api().get('/search', {
      params: {
        searchName: search
      }
    })
      .then((response) => {
        setUsers(response.data.searchName);
      })
      .catch((error) => {
        window.alert("Erro: Pesquisa nao encontrou ou usuario nao existe")
      });
  };
  ///////////
  // funçoes de pesquisa por data selecionada o horario de pesquisa começa a 00:01 até 23:59
  const handleCalendarChange = (newDate: Date | Date[]) => {
    if (Array.isArray(newDate) && newDate.length === 2) {
      const start = new Date(newDate[0]);
      start.setHours(0, 1, 0, 0); 

      const end = new Date(newDate[1]);
      end.setHours(23, 59, 0, 0); 

      setDateRange([start, end]);

      Api().get('/search', {
        params: {
          startDate: start,
          endDate: end
        }
      })
        .then((response) => {
          setUsers(response.data.searchParams);
          setShowCalendar(!showCalendar);

        })
        .catch((error) => {
          setShowCalendar(!showCalendar);
          window.alert("Erro: Nao existem dados na data selecionada")
        });

    }
  };

  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        showCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        event.target !== document.getElementById('calendar-button')
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showCalendar, setShowCalendar, calendarRef]);

  const calendarOnChange = (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value === null) {
      handleCalendarChange([new Date(), new Date()]);
    } else {
      handleCalendarChange(value as Date[]);
    }


  };
  ////////////////////////////////

  // funçoes para pesquisa de ordem descrescente ou crescente
  const handleSort = (order: string) => {
    Api().get('/search', {
      params: {
        sortOrder: order
      }
    })
      .then((response) => {
        setUsers(response.data.searchDate);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Error: Nao existe dados no periodo selecionado")
      });
  };

  const handleDropdownSelection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const selectedOrder = e.currentTarget.textContent?.toLowerCase();
    if (selectedOrder === 'menor ao maior') {
      handleSort('asc');
    } else if (selectedOrder === 'maior ao menor') {
      handleSort('desc');
    }
  };
  ////////////////////////////////////////////////////////////////////////

  //funçao para formatar data
  const formatDate = (dateString: string): string => {
    const createdDate = new Date(dateString);
    return createdDate.toLocaleDateString('pt-BR');
  };

  // retorno do componente 
  return (<>

    <Card>
      <Header />
      <CardHeader>
        <div className='d-flex justify-content-between'>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <form className="d-flex" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Pesquise pelo nome"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Busca
                </button>
              </form>
            </div>
          </nav>
          <Button
            id="calendar-button"
            variant="dark"
            size="lg"
            className="rounded-pill"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            Pesquisa por data
          </Button>
          {showCalendar && (
            <Card ref={calendarRef} className="position-absolute top-0 start-0 z-index-1000">
              <Calendar
                onChange={calendarOnChange}
                selectRange={true}
                value={dateRange}
                showWeekNumbers={true}
                formatLongDate={(locale, date) =>
                  new Intl.DateTimeFormat('pt-BR', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }).format(date)
                }
              />
            </Card>
          )}

          <Dropdown className='me-4'>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Pesquisa por Ordem
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={handleDropdownSelection}>Menor ao maior</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={handleDropdownSelection}>Maior ao menor</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </CardHeader>
      {(!users) ?
        <CardBody className='text-center'>
          <FontAwesomeIcon icon={faSpinner} spin />
        </CardBody>
        :
        <CardBody className='mt-4' >
          <CardSubtitle>Clique no nome para ir para configurações de usuario</CardSubtitle>
          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Data de cadastro</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user: UserInterface, index: number) => (
                <tr className="pe-auto" key={index}
                >
                  <td onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>


        </CardBody>
      }
      <CardFooter>

      </CardFooter>
    </Card >

  </>

  )
}

export default UsersList;
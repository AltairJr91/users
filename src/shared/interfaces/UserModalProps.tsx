import UserInterface from "./UserInterface";


interface UserModalProps {
    selectedUser: UserInterface;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default UserModalProps;
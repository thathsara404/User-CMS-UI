import { UserContextConsumer } from '../context/userContext';
import { BigDangerButton } from './Button';

const Deletion = ({ updateUserState }) => {

    const handleClick = (event) => {
        event.preventDefault();
        updateUserState(state => ({ ...state,
            user: {}, isLoggedIn: false }));
    };

    return (
        <UserContextConsumer>
            {
                ({ user, isLoggedIn }) => isLoggedIn !== false ? (
                    <>
                        <h1>Delete User</h1>
                        <BigDangerButton onClick={(event, user) => {
                            handleClick(event, user);
                        }} text='Delete User' />
                    </>
                ) : <p>User should sign in to delete...</p>
            }
        </UserContextConsumer>
    );
};

export default Deletion;

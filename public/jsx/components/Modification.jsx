import { useReducer, useRef } from 'react';
import { HTTPHelper } from '../../js/util/httpHelper';
import { PATCH_USER_URL } from '../../js/util/urlBuilder';
import { UserContextConsumer } from '../context/userContext';
import { BigInfoButton } from './Button';

const Modification = ({ updateUserState }) => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const [state, setFormState] = useReducer((state, action) => {
        switch (action.type) {
            case 'update-first-name':
                return { ...state, firstName: firstNameRef.current.value };
            case 'update-last-name': 
                return { ...state, lastName: lastNameRef.current.value };
            default: 
                return { ...state };
        }
    }, {
        firstName: '',
        lastName: ''
    }
    );

    const handleSubmit = (event, user) => {
        event.preventDefault();
        const patchData = { 'firstName': state.firstName, 'lastName': state.lastName };
        HTTPHelper.patch(`${PATCH_USER_URL}${user.id}`, {}, patchData).then((response, error) => {
            
            const updatedData = {
                firstName: state.firstName,
                lastName: state.lastName
            };

            if (!error) {
                updateUserState(state => ({ ...state,
                    user: { ...user, firstName: patchData.firstName, lastName: patchData.lastName } }));
                // eslint-disable-next-line no-alert
                alert('User updated successfully !'); 
            } else {
                console.error('An error occurred: ' + error);
            }
        });
    };

    return (
        <UserContextConsumer>
            {({ user, isLoggedIn }) => isLoggedIn !== false ? (
                <>
                    <h1>Update User</h1>
                    <form action='' method='post'>
                        <label htmlFor='firstName'>
                    First Name: <input ref={firstNameRef} type='text' name='firstName' id='firstName'
                                onChange={() => {
                                    setFormState({ type: 'update-first-name' });
                                }} required/>
                        </label><br/><br/>
                        <label htmlFor='lastName'>
                    Last Name: <input ref={lastNameRef} type='text' name='lastName' id='lastName'
                                onChange={() => {
                                    setFormState({ type: 'update-last-name' });
                                }} required/>
                        </label><br/><br/>
                        <BigInfoButton onClick={(event) =>
                        { handleSubmit(event, user); }} text='Update User' />
                    </form>
                </>
            ) : (
                <p>User should sign in to update...</p>
            )
            }
        </UserContextConsumer>
    );
};

export default Modification;

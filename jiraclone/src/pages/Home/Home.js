import React from 'react';
import { useSelector } from 'react-redux';

export default function Home(props) {
    const usLogin = useSelector(state => state.UserJiraCloneReducer.userLogin);
    return (
        <div>
            {usLogin.name}
        </div>
    );
}

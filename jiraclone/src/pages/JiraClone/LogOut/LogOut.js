import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Image } from 'antd';
import { LOGOUT_SAGA, USLOGIN } from '../../../redux/constants/JiraClone/JiraCloneConstant';
import { USER_LOGIN } from '../../../util/constanst/settingSystem';

export default function LogOut() {
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.UserJiraCloneReducer);
    return (
        <div className='log_out_jira'>
            {localStorage.getItem(USER_LOGIN) ? <div>
                <span>Xin chào!
                    <span className='ml-1' style={{ fontWeight: 'bold' }}>{userLogin.name}</span>
                    <Avatar size={40} src={userLogin.avatar} className='mx-3'></Avatar>


                </span>
                <a href="#" class="btn btn-info btn-xl" onClick={() => {
                    dispatch({
                        type: LOGOUT_SAGA
                    });
                }}>
                    <span class="glyphicon glyphicon-log-out"></span> Log out
                </a>

            </div> : ''}

        </div>
    );
}

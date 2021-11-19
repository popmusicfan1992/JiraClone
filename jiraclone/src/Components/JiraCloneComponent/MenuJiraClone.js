import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../index.css';
export default function MenuJiraClone() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require('../../assets/img/Jira.png').default} alt='123' />
                </div>
                <div className="account-info">
                    <p>Jira.com</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card mr-1" />
                    <NavLink to='/projectdetails' className='text-dark' activeClassName='activeFont'>Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-pen mr-1"></i>
                    <NavLink to='/createproject' className='text-dark' activeClassName='activeFont'>Create Project</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink to='/projectmanagament' className='text-dark' activeClassName='activeFont'>Project Management</NavLink>
                </div>
                <div>
                    <i className="fa fa-users-cog mr-1" />
                    <NavLink to='/usermanagement' className='text-dark' activeClassName='activeFont'>User Management</NavLink>
                </div>
            </div>
            <div className="feature">
                <div className='icon-trash' style={{ cursor: 'not-allowed' }}>
                    <i className="fa fa-truck mr-2" />
                    <span>Releases</span>
                </div>
                <div className='icon-trash' style={{ cursor: 'not-allowed' }}>
                    <i className="fa fa-equals mr-2" />
                    <span>Issues and filters</span>
                </div>
                <div className='icon-trash' style={{ cursor: 'not-allowed' }}>
                    <i className="fa fa-paste mr-2" />
                    <span>Pages</span>
                </div>
                <div className='icon-trash' style={{ cursor: 'not-allowed' }}>
                    <i className="fa fa-location-arrow mr-2" />
                    <span>Reports</span>
                </div>
                <div className='icon-trash' style={{ cursor: 'not-allowed' }}>
                    <i className="fa fa-box mr-2" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    );
}

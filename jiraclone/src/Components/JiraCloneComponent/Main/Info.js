import React from 'react';

export default function Info(props) {

    const renderAvatar = () => {
        return props.projectDetails.members?.map((user, index) => {
            return <div className="avatar" key={index}>
                <img src={user.avatar} alt='123' />
            </div>;
        });
    };
    return (

        <div className="info" style={{ display: 'flex' }}>

            <div className="search-block">
                <input className="search" disabled />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>

    );
}

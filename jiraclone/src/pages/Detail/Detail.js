import React from 'react';

export default function Detail(props) {
    return (
        <div>
            Gía trị tham số : {props.match.params.id}
            {props.match.path}
        </div>
    );
}

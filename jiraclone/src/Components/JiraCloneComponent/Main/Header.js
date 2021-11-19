import React from 'react';
import ReactHtmlParse from 'react-html-parser';
export default function Header(props) {
    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">PhuHuynh</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Board
                    </li>
                </ol>
            </nav>
            <h3>{props.projectDetails.projectName}</h3>
            <p>
                {ReactHtmlParse(props.projectDetails.description)}
            </p>
        </div>

    );
}

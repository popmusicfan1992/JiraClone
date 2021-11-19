import React, { Fragment, useState, useEffect } from "react";
import { Route } from 'react-router-dom';
import { Button } from "antd";
import { Layout } from 'antd';
import SideBarJiraClone from "../../Components/JiraCloneComponent/SideBarJiraClone";
import MenuJiraClone from "../../Components/JiraCloneComponent/MenuJiraClone";
import Header from "../../Components/JiraCloneComponent/Main/Header";
import Info from "../../Components/JiraCloneComponent/Main/Info";
import Content from "../../Components/JiraCloneComponent/Main/Content";
import ModalJira from "../../Components/JiraCloneComponent/ModalJira/ModalJira";
import IndexJiraClone from "../../pages/JiraClone/ProjectJira/IndexJiraClone";
import LogOut from "../../pages/JiraClone/LogOut/LogOut";



export const JiraCloneTemplate = (props) => {

    let { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <div className='jira'>
            <SideBarJiraClone />
            <MenuJiraClone />

            <Component {...propsRoute} />
            <LogOut />
            <ModalJira />


        </div>;
    }} />;
};
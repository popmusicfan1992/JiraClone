import React, { useEffect } from 'react';
import Content from '../../../Components/JiraCloneComponent/Main/Content';
import Header from '../../../Components/JiraCloneComponent/Main/Header';
import Info from '../../../Components/JiraCloneComponent/Main/Info';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAILS_SAGA } from '../../../redux/constants/JiraClone/JiraCloneConstant';
export default function IndexJiraClone(props) {
    const { projectDetails } = useSelector(state => state.ProjectEditReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAILS_SAGA,
            projectId: projectId
        });
    }, []);

    return (
        <div className='main'>
            <Header projectDetails={projectDetails} />
            <Info projectDetails={projectDetails} />
            <Content projectDetails={projectDetails} />

        </div>
    );
}

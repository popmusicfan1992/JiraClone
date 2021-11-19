import React from 'react';
import styleLoading from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {

    const { isLoading } = useSelector(state => state.LoadingReducer);

    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src='https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif' />
            </div>
        );
    } else {
        return '';
    }
}

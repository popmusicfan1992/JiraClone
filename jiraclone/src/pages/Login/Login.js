import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
export default function Login(props) {


    const [ userLogin, setUserLogin ] = useState({ taikhoan: '', matkhau: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [ name ]: value
        });
    };
    console.log(userLogin);
    const handleLogin = (event) => {
        event.preventDefault();
        if (userLogin.taikhoan === '123' && userLogin.matkhau === '123') {
            //Thành công thì chuyển về trang trước đó
            // props.history.goBack();
            //Chuyển đến trang chỉ định sau khi xử lý
            // Chuyển hướng đến path tương ứng
            //  props.history.push('/home');

            //replace thay đổi nội dung path tương ứng
            // props.history.replace('/home');
        } else {
            alert('Login fail !');
            return;
        }
    };
    return (
        <form className='container' onSubmit={handleLogin}>
            <h3>Login</h3>
            <div classname="form-group">
                <input name="taikhoan" classname="form-control" onChange={handleChange} />
            </div>
            <div classname="form-group">
                <input name="matkhau" type='password' classname="form-control" onChange={handleChange} />
            </div>
            <div className='form-group'>
                <button className='btn btn-success' >Login</button>

            </div>

            <Prompt when={true} message={(location) => {
                return 'Bạn có chắc muốn rời khỏi trang này';
            }} />




        </form>
    );
}

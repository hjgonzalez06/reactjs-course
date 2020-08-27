import React from 'react';
import styles from './login.module.css';
import { connect } from 'react-redux';
import { doGoogleLoginAction, doGoogleLogoutAction } from '../../redux/userDuck';

function LoginPage({ fetching, loggedIn, doGoogleLoginAction, doGoogleLogoutAction }) {

    function doLogin(){

        doGoogleLoginAction();

    };

    function doLogout(){

        doGoogleLogoutAction();

    };

    if (fetching) return <h2>--- CARGANDO ---</h2>;

    return (
        <div className={styles.container}>

            {loggedIn ? <h1>
                --- CIERRE SU SESIÓN ---
            </h1> : <h1>
                --- INICIO DE SESIÓN CON GOOGLE ---
            </h1>}
            
            {loggedIn ? <button onClick={doLogout}>
                Salir
            </button> : <button onClick={doLogin}>
                Autenticarse
            </button>}
            
        </div>
    );

};

function mapStateToProps({ user: { fetching, loggedIn } }){

    return {
        fetching,
        loggedIn
    };

}

export default connect(mapStateToProps, { doGoogleLoginAction, doGoogleLogoutAction })(LoginPage);
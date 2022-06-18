import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router'
import LayoutWrapper from "../layouts/LayoutWrapper";
import { Provider } from 'react-redux';
import store from '../store';
import Login from '../screens/Login';
import { authenticate, unauthenticate } from "../store/actions/sessionAction";

class MyApp extends App {
  constructor() {
    super()
    this.state = {
      allowed: true
    }
  }

  async componentDidMount() {    
    let token = (localStorage !== undefined) && localStorage.getItem('user_token')
    if (token !== null) {
       store.dispatch(authenticate());
    } else {  
        if(Router.pathname.startsWith("/login") !== true && Router.pathname.startsWith("/test-registration-form-without-login") !== true && Router.pathname.startsWith("/404") !== true && Router.pathname.startsWith("/500") !== true &&  Router.pathname.startsWith("/payment-status") !== true &&  Router.pathname.startsWith("/qr-code") !== true  &&Router.pathname.startsWith("/faq") !== true && Router.pathname.startsWith("/schedule-appointment") !== true && Router.pathname.startsWith("/travel-advisor") !== true && Router.pathname.startsWith("/groupEvents") !== true && Router.pathname.startsWith("/result-verification") !== true && Router.pathname.startsWith("/reset-password") !== true && Router.pathname.startsWith("/privacy-policy") !== true && Router.pathname.startsWith("/terms-of-service") !== true && Router.pathname.startsWith("/pre-registration-form") !== true && Router.pathname.startsWith("/disclaimer") !== true) {
          Router.replace('/')
        }
     }

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
    const userObj = await JSON.parse(User);
    let roleCode = userObj !== null && Object.keys(userObj).length > 0 ? userObj.userRoles[0].role.code : null
    const { pathname } = Router
   

    // Router.beforePopState(() => {
    //   history.forward()
    // })

    if (pathname.startsWith("/admin") && (roleCode !== null && roleCode !== "ADM")) {
      if (roleCode === "ADM") {
        Router.push(pathname.replace("admin", "admin"));
      } else {
        Router.replace('/login')
        this.setState({ allowed: false })
      }
    }
    if (pathname.startsWith("/customer") && (roleCode !== null && roleCode !== "CSR")) {
      if (roleCode === "CSR") {
        Router.push(pathname.replace("customer", "customer"));
      } else {
        Router.replace('/login')
        this.setState({ allowed: false })
      }
    }
    if (pathname.startsWith("/lab-technician") && (roleCode !== null && roleCode !== "LBT")) {
      if (roleCode === "LBT") {
        Router.push(pathname.replace("lab-technician", "lab-technician"));
      } else {
        Router.replace('/login')
        this.setState({ allowed: false })
      }
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    const ComponentToRender = this.state.allowed ? Component : Login;
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#2379BB" />
          <meta name="description" content="Looking for COVID-19 Testing in Scottsdale? Get accurate results and fast turnaround times at our walk-up location in Old Town!" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <title>COVID-19 Testing in Scottsdale, AZ</title>
        </Head>
        <Provider store={store}>
          <LayoutWrapper {...pageProps}>
            <ComponentToRender {...pageProps} />
          </LayoutWrapper>
        </Provider>
      </>
    );
  }
}

export default MyApp;
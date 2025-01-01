import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

function ShowModal({closeModal}) {

    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{
        document.body.style.overflowY="scroll";
        }
    },[]);
  return (
    <StyledWrapper>
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(189,189,189,0.9)]" onClick={closeModal}></div>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
      <form className="form">
        <div className="form-title"><span>ADD EVENT</span></div>
        <div className="title-2"><span>OPTICA</span></div>
        <div className="input-container">
          {/* <input placeholder="Event Name" type="text" className="input-mail" /> */}
            <label className="text-base text-white  after:content-['*'] after:text-red-400" htmlFor="eventName">Even Name </label> 
            <br></br>    
            <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" placeholder="Event Name" type="eventName"  required/>   
          <span> </span>
        </div>
        <section className="bg-stars">
          <span className="star" />
          <span className="star" />
          <span className="star" />
          <span className="star" />
        </section>
        <div className="input-container">
          {/* <input  type="date" className="input-pwd" /> */}
            <label className="text-base text-white after:content-['*'] after:text-red-400" htmlFor="date">Date</label>
            <br></br>
            <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="date" required />
        </div>

             
        <div className='flex gap-1 input-container'>
                <div>
                <label className="text-base text-white after:content-['*'] after:text-red-400" htmlFor="time">From</label>
                <br></br>
                <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-xl" type="time" timeired="true" required/>
                </div>
                <div className='ml-10'>
                <label className="text-base text-white after:content-['*'] after:text-red-400" htmlFor="time">To</label>
                <br></br>
                <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-xl" type="time" timeired="true" required/>
                </div>
            </div>
        {/* <button className="submit" type="submit">
          <span className="sign-text">Sign in</span>
        </button>
        <p className="signup-link">
          No account?
          <a className="up" href>Sign up!</a>
        </p> */}
            <div >
                <input className="text-white  w-full p-1 mb-2 mt-5 outline-none ring-none focus:ring-2 focus:ring-indigo-500 " type="file" name='image'  />
            </div>
            <div className='flex gap-5 px-5 py-8'>
                <button className="submit w-full rounded-lg bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400">Add</button>
                <button className="submit  w-full rounded-lg bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400" onClick={closeModal}>Close</button>
            </div>
      </form>
    </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    position: relative;
    display: block;
    padding: 2.2rem;
    min-width: 500px;
    background: linear-gradient(
        14deg,
        rgba(2, 0, 36, 0.8) 0%,
        rgba(24, 24, 65, 0.7) 66%,
        rgb(20, 76, 99) 100%
      ),
      radial-gradient(
        circle,
        rgba(2, 0, 36, 0.5) 0%,
        rgba(32, 15, 53, 0.2) 65%,
        rgba(14, 29, 28, 0.9) 100%
      );
    border: 2px solid #fff;
    -webkit-box-shadow: rgba(0, 212, 255) 0px 0px 50px -15px;
    box-shadow: rgba(0, 212, 255) 0px 0px 50px -15px;
    overflow: hidden;
    z-index: +1;
    border-radius: 8px;
  }

  /*------input and submit section-------*/

  .input-container {
    position: relative;
  }

  .input-container input,
  .form button {
    outline: none;
    border: 2px solid #ffffff;
    margin: 8px 0;
    font-family: monospace;
    border-radius: 4px;
  }

  .input-container input {
    background-color: #fff;
    padding: 6px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .input-mail:focus::placeholder {
    opacity: 0;
    transition: opacity 0.9s;
  }

  .input-pwd:focus::placeholder {
    opacity: 0;
    transition: opacity 0.9s;
  }

  .submit {
    position: relative;
    display: block;
    padding: 8px;
    background: linear-gradient(90deg, #243949 0%, #517fa4 100%);
    color: #ffffff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    font-size: 0.975rem;
    line-height: 1.25rem;
    font-weight: bolder;
    width: 100%;
    text-transform: uppercase;
    overflow: hidden;
  }

  .submit:hover {
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    box-shadow: 4px 5px 17px -4px #ffffff;
    cursor: pointer;
  }

  .submit:hover::before {
    -webkit-animation: sh02 0.5s 0s linear;
    -moz-animation: sh02 0.5s 0s linear;
    animation: sh02 0.5s 0s linear;
  }

  .submit::before {
    content: "";
    display: block;
    width: 0px;
    height: 85%;
    position: absolute;
    top: 50%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    -webkit-transform: skewX(-20deg);
    -moz-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    -o-transform: skewX(-20deg);
    transform: skewX(-20deg);
  }

  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0;
      left: 100%;
    }
  }

  /*--------signup section---------*/

  .signup-link {
    color: #c0c0c0;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    font-family: monospace;
  }

  .signup-link a {
    color: #fff;
    text-decoration: none;
  }

  .up:hover {
    text-decoration: underline;
  }

  /*--------header section-----------*/

  .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-family: monospace;
    font-weight: 600;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
    animation-duration: 1.5s;
    overflow: hidden;
    transition: 0.12s;
  }

  .form-title span {
    animation: flickering 2s linear infinite both;
  }

  .title-2 {
    display: block;
    margin-top: -0.5rem;
    font-size: 2.1rem;
    font-weight: 800;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    -webkit-text-stroke: #fff 0.1rem;
    letter-spacing: 0.2rem;
    color: transparent;
    position: relative;
    text-shadow: 0px 0px 16px #cecece;
  }

  .title-2 span::before,
  .title-2 span::after {
    content: "—";
  }

  @keyframes flickering {
    0%,
    100% {
      opacity: 1;
    }

    41.99% {
      opacity: 1;
    }

    42% {
      opacity: 0;
    }

    43% {
      opacity: 0;
    }

    43.01% {
      opacity: 1;
    }

    47.99% {
      opacity: 1;
    }

    48% {
      opacity: 0;
    }

    49% {
      opacity: 0;
    }

    49.01% {
      opacity: 1;
    }
  }

  /*---------shooting stars-----------*/

  .bg-stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-size: cover;
    animation: animateBg 50s linear infinite;
  }

  @keyframes animateBg {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }
  }

  .star {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
      0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
    animation: animate 3s linear infinite;
  }

  .star::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }

  @keyframes animate {
    0% {
      transform: rotate(315deg) translateX(0);
      opacity: 1;
    }

    70% {
      opacity: 1;
    }

    100% {
      transform: rotate(315deg) translateX(-1000px);
      opacity: 0;
    }
  }

  .star:nth-child(1) {
    top: 0;
    right: 0;
    left: initial;
    animation-delay: 0s;
    animation-duration: 1s;
  }

  .star:nth-child(2) {
    top: 0;
    right: 100px;
    left: initial;
    animation-delay: 0.2s;
    animation-duration: 3s;
  }

  .star:nth-child(3) {
    top: 0;
    right: 220px;
    left: initial;
    animation-delay: 2.75s;
    animation-duration: 2.75s;
  }

  .star:nth-child(4) {
    top: 0;
    right: -220px;
    left: initial;
    animation-delay: 1.6s;
    animation-duration: 1.6s;
  }
    
  @media (max-width: 480px) {
  .form {
    padding: 1rem;
    min-width: 90%;
    border-radius: 6px;
  }

  .input-container input {
    width: 100%;
    font-size: 0.875rem;
    padding: 8px;
  }

  .submit {
    font-size: 0.875rem;
    line-height: 1.2rem;
    padding: 6px;
  }

  .form-title {
    font-size: 1.1rem;
  }

  .title-2 {
    font-size: 1.8rem;
  }
}
  
@media (max-width: 320px) {
  .form {
    padding: 0.8rem;
    min-width: 85%;
  }

  .form-title {
    font-size: 1rem;
  }

  .title-2 {
    font-size: 1.6rem;
    margin-top: -0.3rem;
  }

  .input-container input {
    font-size: 0.75rem;
    padding: 4px;
  }

  .submit {
    font-size: 0.75rem;
    padding: 5px;
  }
}
  
@media (max-width: 768px) {
  .form {
    padding: 1.5rem;
    min-width: 400px;
    box-shadow: rgba(0, 212, 255, 0.4) 0px 0px 30px -10px;
  }

  .input-container input {
    width: 100%;
  }

  .submit {
    width: 100%;
  }
}`;

export default ShowModal;

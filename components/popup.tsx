import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import Register from "./register";
import Modal from "react-bootstrap/Modal";


const Popup = (props: any) => {
  const { handleLogin, handleSignup, setShowModal, loginOpen } = props;
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Modal show={props.showModal} onHide={hideModal}>
        <div
          id="sign-in-dialog"
          className="zoom-anim-dialog mfp-hide dialog-with-tabs"
        >
          <Modal.Header closeButton>
            <div className="sign-in-form">
              <Modal.Title>
                <ul className="popup-tabs-nav">
                  <Button
                    className="nav-button border border-top-0"
                    onClick={handleLogin}
                  >
                    Log In
                  </Button>
                  <Button
                    className="nav-button border border-top-0"
                    onClick={handleSignup}
                  >
                    Register
                  </Button>
                </ul>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            {loginOpen ? <Login handleSignup={handleSignup} /> : <Register />}
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;

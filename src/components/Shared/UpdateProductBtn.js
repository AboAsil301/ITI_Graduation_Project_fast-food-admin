import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import UpdateIcon from "../../Image/icon/update-icon.svg";
import { UpdateCategoryModal } from "./UpdateCategoryModal";
import { UpdateOfferModal } from "./UpdateOfferModal";
import { UpdateProductModal } from "./UpdateProductModal";
import "./AddProductBtn.css";

export function UpdateProductBtn({ name, pagename, productDetails, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <img src={UpdateIcon} alt="Update"  onClick={handleShow}  style={{width: "15px", height: "15px" , cursor: "pointer"}} />
  
      <Offcanvas
        className="right-sidebar"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            {
              products: (
                <UpdateProductModal
                  createname={"create " + pagename}
                  productDetails = {productDetails}

                  closeFunc={handleClose}
                />
              ),
              category: (
                <UpdateCategoryModal
                  createname={"Update " + pagename}
                  productDetails = {productDetails}
                  closeFunc={handleClose}
                />
              ),
              offers: (
                <UpdateOfferModal
                  createname={"create " + pagename}
                  productDetails = {productDetails}
                  closeFunc={handleClose}
                />
              ),
            }[pagename]
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

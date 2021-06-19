import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {FaGithub} from 'react-icons/fa'
const FooterPage = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 bg-dark footer sticky-bottom">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className='text-white'>
          <strong>Developed by Swapnil Tiwari</strong><a target='blank' className='giticon' href='https://github.com/SWAPNIL087'> <FaGithub /></a>

        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
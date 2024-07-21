import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
import { FaFan } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";

// Define styled components
const SidebarContainer = styled.div`
  width: 50px; /* Set the width */
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 80px;
`;

const BottomLink = styled(Link)`
  color: ${(props) => (props.active ? 'green' : 'grey')};
//   margin: 10px 5px;
  text-decoration: none;


  &:hover {
    color: green; /* Change color on hover */
  }
`;

const SidebarLink = styled(Link)`
  color: ${(props) => (props.active ? 'green' : 'grey')}; /* Normal color */
  margin: 10px 0;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: green; /* Change color on hover */
  }
`;

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/page0'); // Set the initial active link

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <SidebarContainer>
            <LinksContainer>
                <SidebarLink
                    to="/page0"
                    className='link1'
                    active={ activeLink === '/page0' }
                    onClick={ () => handleLinkClick('/page0') }
                >
                    <FaFan size={ '20px' } />
                </SidebarLink>
                <SidebarLink
                    to="/page1"
                    className='link'
                    active={ activeLink === '/page1' }
                    onClick={ () => handleLinkClick('/page1') }
                >
                    <FaMeta size={ '20px' } />
                </SidebarLink>
                <SidebarLink
                    to="/page2"
                    className='link'
                    active={ activeLink === '/page2' }
                    onClick={ () => handleLinkClick('/page2') }
                >
                    <MdOutlinePhotoSizeSelectActual size={ '20px' } />
                </SidebarLink>
                <SidebarLink
                    to="/page3"
                    className='link'
                    active={ activeLink === '/page3' }
                    onClick={ () => handleLinkClick('/page3') }
                >
                    <FaShopify size={ '20px' } />
                </SidebarLink>
                {/* Add more links as needed */ }
            </LinksContainer>
            <div className='bottom'>
                <BottomLink
                    to="/settings"
                    active={ activeLink === '/settings' }
                    onClick={ () => handleLinkClick('/settings') }
                >
                    <FaCog size={ '20px' } />
                </BottomLink>
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;

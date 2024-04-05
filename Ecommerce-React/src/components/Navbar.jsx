import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 60px;
  ${mobile({height:"50px "})}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-left:15px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: .5px solid lightblue;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
 
  
`;

const Input=styled.input`
  border: none;
  ${mobile({ width: "40px" })}
  
  
`



const Logo=styled.h1`
`
const Image=styled.img`
  width: 120px; /* Set your desired width */
  height: auto; /* Maintain the aspect ratio */
  margin-right: 15px; /* Add margin-right for spacing */
  border-radius: 8px; /* Add border-radius for a rounded appearance */
  ${mobile({ width: "100px" })}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex:2, justifyContent: "center" })}
`;

const MenuItem=styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
  return (

    <Container>

      <Wrapper>

        <Left>

          <Image src="../../asset/StopBuy-2-27-2024.png" alt="StopBuyIcon" />

          <Language>EN</Language>

          <SearchContainer>

            <Input placeholder="Search"  />

            <Search style={{color:"gray",fontSize:20}} />

          </SearchContainer>

        </Left>

        

        <Right>
          
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={3} color="primary">
                <ShoppingCartOutlined/>
            </Badge>
          </MenuItem>
        </Right>

      </Wrapper>

    </Container>
  );
};

export default Navbar;

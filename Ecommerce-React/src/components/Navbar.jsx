import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { logoutUser } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
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
  margin-left: 15px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightblue;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "40px" })}
`;

const Logo = styled.h1``;

const Image = styled.img`
  width: 120px;
  height: auto;
  margin-right: 15px;
  border-radius: 8px;
  ${mobile({ width: "100px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      // Redirect to the appropriate route based on the search query
      navigate(`/products/${searchQuery}`);
    }
  };

  const logout = async () => {
    try {
      const res = await userRequest.post("/auth/logout");
      if (res) {
        dispatch(logoutUser());
        localStorage.removeItem("persist:root", user);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Image src="../../asset/StopBuy-2-27-2024.png" alt="StopBuyIcon" />
          <Language>EN</Language>
          <SearchContainer>
          <Input
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <Search
              style={{ color: 'gray', fontSize: 20, cursor: 'pointer' }}
              onClick={handleSearchSubmit}
            />
          </SearchContainer>
        </Left>

        <Right>
          {user ? (
            <>
            <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          <MenuItem onClick={logout}>LOGOUT</MenuItem>
        </>
            
          ) : (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

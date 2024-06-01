import React, { useEffect, useState } from 'react'
import { popularProducts } from '../data'
import Product from './Product'
import styled from 'styled-components'
import { CleaningServicesOutlined } from '@mui/icons-material'
import axios from "axios";

const Container=styled.div`
    padding:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Products= ({cat,filters,sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts=async()=>{
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-app-taupe-five.vercel.app/api/products?category=${cat}`
            : "https://ecommerce-app-taupe-five.vercel.app/api/products"
        );
        setProducts(res.data);
      } catch (error) {
        
      }
    }
    getProducts()
  },[cat])

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) -new Date(b.createdAt))
      );
    } else if (sort === "asce") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
        {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 10)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  )
}

export default Products

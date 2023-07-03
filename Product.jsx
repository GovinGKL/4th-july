import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcements from "../Components/Announcements";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add_to_cart } from "../redux/action";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  ${mobile({
    padding: "6px",
    display: "flex",
    flexDirection: "column",
  })}
`;
const ImageContainer = styled.div`
  flex: 1;

  ${mobile({})}
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;

  ${mobile({
    height: "50vh",
    objectFit: "contain",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const Title = styled.h1`
  font-weight: 200;
  font-weight: 600;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  })}
`;

const Description = styled.div`
  margin: 20px 0px;
  font-size: 24px;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "300",
  })}
`;

const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
  font-weight: 700;
  color: grey;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "300",
    fontSize: "35px",
  })}
`;

const ShippingMessage = styled.div`
  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "400",
    fontSize: "12px",
    marginBottom: "14px",
  })}
`;

const Hr = styled.hr`
  ${mobile({
    border: "0.5px solid wheat",
    margin: "0",
  })};
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0px;

  padding: 10px;
  font-size: 24px;

  ${mobile({})}
`;

const Sizeheading = styled.div``;

const FilterColors = styled.div`
  display: flex;
  align-items: center;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  })}
`;

const FilterColorText = styled.div`
  font-weight: 500;

  ${mobile({
    fontWeight: "500",
  })}
`;

const FilterColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  margin: 0 5px;
  cursor: pointer;

  ${(props) =>
    mobile({
      backgroundColor: props.color,
      borderRadius: "5px",
    })}
`;

const FilterSizeSelect = styled.select`
  margin-left: 10px;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  })}
`;

const FilterSize = styled.option``;

const FilterSizeText = styled.div`
  font-weight: 500;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "500",
  })}
`;

const FilterSizeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: 0.4px solid black;
  padding: 6px;
  width: 20%;
  background-color: transparent;

  ${mobile({
    width: "80px",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 6px;
`;

const QuantityText = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  font-size: 20px;

  ${mobile({
    width: "80px",
  })}
`;

const Button = styled.button`
  padding: 12px;
  border: 2px solid teal;
  cursor: pointer;
  background-color: white;
  font-weight: 700;
  width: 100%;
  margin-top: 25px;
  background-color: teal;

  &:hover {
    background-color: transparent;
  }
  ${mobile({})}
`;

const ColorButton = styled.button`
  margin: 2px 6px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 2px;
  cursor: pointer;
`;

const Product = () => {
  // defining the useState hook to select (increment , decrement the qunatity)
  const [quantity, SetQuantity] = useState(1);

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");

  //to get the color for the selected product
  const [selectedColor, SetselectedColor] = useState("");
  console.log(selectedColor);

  // to get the size of the selceted Product
  const [selectedSize, SetselectedSize] = useState("");
  console.log(selectedSize);

  // to get the index of the selected product
  const [index, Setindex] = useState(0);
  console.log(index);

  // to get the specified product with specified color and size of the product from the original api

  const [specifiedProduct , SetspecifiedProduct] = useState({})

  // to get the image based on the index 
  const [getImageUrl , SetimageUrl] = useState("") // todo not getting the url of the selected product.
  console.log(getImageUrl);

  // useEffect to get the index of the selected product
  useEffect(() => {
    const findIndex = products.color && products.color.length > 0 && products.color.findIndex((items) => ( items.includes(selectedColor)))
    Setindex(findIndex )
    const getUrl = products.img && products.img[index]
    SetimageUrl(getUrl)
  },[selectedColor , index])

  // function to set the selectedColor
  const handleClickColor = (e) => {
    SetselectedColor(e.target.value);
  };

  // function to set the selectedSize
  const handleSelectSize = (e) => {
    SetselectedSize(e.target.value);
  };

  useEffect(() => {
    // making sure when the page loads the default value of the color is the first index of that array
    if (products.color && products.color.length > 0) {
      // todo getting required output . required color . todo fetch the image based on index
      SetselectedColor(products.color[0]);
    }

    // making sure when the page loads the default value of the color is the first index of that array
    if (products.size && products.size.length > 0) {
      SetselectedSize(products.size[0]);
    }

    // making sure when the page loads to get the imageUrl for the color of the render product
    // if(products.img && products.img.length > 0) {
    //   SetselectedColor()
    // }

    // ! means to change only when the color is changed before mounting that's not possible as the index cannot be tampered.
  }, [products.color, products.size]);

  useEffect(() => {
    // Retrieve the user ID from the local storage and set it to the userId state
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // your existing code...
  }, []);

  const handleAddToCart = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const specifiedProduct = {
      ...products,
      selectedColor,
      selectedSize,
      quantity,
      imageUrl: getImageUrl
    };
  
    const existingCartItem = cartItems.find(
      (item) =>
        item._id === specifiedProduct._id &&
        item.selectedColor === specifiedProduct.selectedColor &&
        item.selectedSize === specifiedProduct.selectedSize
    );
  
    if (existingCartItem) {
      existingCartItem.quantity += specifiedProduct.quantity;
    } else {
      cartItems.push(specifiedProduct);
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Dispatch the action to update the cart state in your application
    dispatch(add_to_cart({ ...products, quantity }));

    try {
      const url = "http://localhost:5000/api/cart/createCart";
      const token = localStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1])).userId;

      // Filter out duplicate products and update their quantities
      const filteredCartItems = cartItems.reduce((acc, item) => {
        const existingItemIndex = acc.findIndex(
          (i) => i.productId === item.productId
        );

        if (existingItemIndex !== -1) {
          // If the product already exists, update the quantity
          acc[existingItemIndex].quantity += item.quantity;
        } else {
          // If the product doesn't exist, add it to the filtered list
          acc.push(item);
        }

        return acc;
      }, []);

      const payload = {
        userId: userId,
        product: filteredCartItems.map((item) => ({
          productTitle: item.title,
          productId: item._id,
          quantity: item.quantity,
          img: item.img,
          size: item.size,
          color: item.color,
          categories: item.categories,
          price: item.price,
        })),
        amount: filteredCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };

      const headers = {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      // Making a post request to the API endpoint to store the cart item in the database.
      const storeData = await axios.post(url, payload, headers);
      console.log(storeData.data); // Log the response from the server for debugging
    } catch (error) {
      console.error(error); // Log any errors that occurred during the request
    }
  };

  console.log("actual product from api");
  console.log(products);
  console.log(
    "------------------------------------------------------- unfiltered"
  );

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  useEffect(() => {
    const getProducts = async () => {
      // as soon as the page loads the screen goes to top , this function renders everytime when the category changes
      try {
        window.scrollTo(0, 0);
        const res = await axios.get(
          `http://localhost:5000/api/product/getproduct/${cat}`
        );
        setProducts(res.data[0]);

        // Check if selectedColor is null and if a color is already selected in the state
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  return (
    <div>
      <Container>
        <Navbar />
        <Announcements />
        <Wrapper>
          <ImageContainer>
            <Image src={products.img && products.img[index]} />
          </ImageContainer>

          <Hr />
          <InfoContainer>
            <Title>{products.title}</Title>
            <Description>{products.description}</Description>
            <Price>$ {products.price}</Price>
            <ShippingMessage>Shipping calculated at checkout</ShippingMessage>
            <Hr />

            <FilterContainer>
              <FilterColors>
                <FilterColorText>Color :</FilterColorText>

                {/* first checks if the products.color property exists or not if it exists then it maps over teh color value of the object */}
                {products.color && products.color.length > 1 ? (
                  products.color.map((color, index) => (
                    <ColorButton
                      value={color}
                      onClick={handleClickColor}
                      name={color}
                      selected={
                        selectedColor === color ||
                        (index === 0 && !selectedColor)
                      }
                    >
                      {color}
                    </ColorButton>
                  ))
                ) : (
                  <ColorButton>{products.color}</ColorButton>
                )}
              </FilterColors>

              <FilterSizeContainer>
                <FilterSizeText>Size :</FilterSizeText>
                <FilterSizeSelect onChange={handleSelectSize}>
                  {/* <FilterSize value="XS">XS</FilterSize> */}
                  {/* here the product is an object so cant map with the object so instead checking if the product has the property size if the exists then map map with that value as the size is an array inside the object , can't directly access the size here but to check whether the property size exists or not */}
                  {products.size &&
                    products.size.map((items) => {
                      return (
                        <FilterSize key={items} name={items} value={items}>
                          {items}
                        </FilterSize>
                      );
                    })}
                </FilterSizeSelect>
              </FilterSizeContainer>
            </FilterContainer>

            <QuantityText>Quantity</QuantityText>
            <AddContainer>
              <AmountContainer>
                <RemoveIcon
                  onClick={() =>
                    SetQuantity((previous) => (previous > 1 ? previous - 1 : 1))
                  }
                  hover="true"
                />
                <Amount>{quantity}</Amount>
                <AddIcon
                  onClick={() => SetQuantity((previous) => previous + 1)}
                  hover="true"
                />
              </AmountContainer>
            </AddContainer>

            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </div>
  );
};

export default Product;
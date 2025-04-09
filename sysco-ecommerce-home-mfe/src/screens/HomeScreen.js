import React, { useEffect, useState } from "react";
import ImageCarousel from "../components/ImageCarousel";
import FeaturedProducts from "../components/FeaturedProducts";
import { Layout } from "antd";
import { createCartIfnotExist } from "../services/cartService";

const { Content, Footer } = Layout;

const HomeScreen = () => {
  const carouselImages = [
    "https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg",
    "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
  ];

  const [cart, setCart] = useState(null);

  const getCartInfo = async () => {
    try {
      let userId = localStorage.getItem("userToken");

      const res = await createCartIfnotExist(userId);
      console.log("Cart Response:", res?.data);
      setCart(res?.data?.cart?.data || res?.data); // Set the cart state
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    getCartInfo();
  }, []);

  useEffect(() => {
    console.log("Updated CART:", cart);
    localStorage.setItem("cartId", cart?.id);
  }, [cart]); // Now properly logs when cart updates

  return (
    <Layout>
      <Content style={{ padding: "0", margin: "0" }}>
        <ImageCarousel images={carouselImages} />
        <div style={{ padding: "0 50px" }}>
          <FeaturedProducts cartId={cart?.id} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        My E-Commerce ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  );
};

export default HomeScreen;

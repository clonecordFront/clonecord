import React from "react";
import Layout from "../../components/common/layout/Layout";
import LoginPage from "../loginPage/LoginPage";
import { useSelector } from "react-redux";
import styles from "./MainPage.module.css";

export default function MainPage() {
 
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <Layout>
      <div className={styles.container}>
      </div>
    </Layout>
  );
}
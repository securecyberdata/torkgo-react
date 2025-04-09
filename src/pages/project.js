import PageHeader from "@/components/base/PageHeader";
import Layout from "@/components/layout/Layout";
import React from "react";
import Head from "next/head";
import UpcommingTwo from "@/components/modules/project2/UpcommingTwo";
import CompletedTwo from "@/components/modules/project2/CompletedTwo";

const Project = () => {
  return (
    <>
      <Head>
        <title>Project - Torkgo</title>
        <meta name="description" content="Project - Torkgo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageHeader title="Project" text="Home" text2="Project" />
        <UpcommingTwo />
        <CompletedTwo />
      </Layout>
    </>
  );
};

export default Project;

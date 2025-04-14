import PageHeader from "@/components/base/PageHeader";
import Layout from "@/components/layout/Layout";
import React from "react";
import Head from "next/head";
import UpcommingTwo from "@/components/modules/project2/UpcommingTwo";
import CompletedTwo from "@/components/modules/project2/CompletedTwo";
import Simple from "@/components/base/Simple";
import Link from "next/link";

const Project = () => {
  return (
    <>
      <Head>
        <title>Projects - PS Bank</title>
        <meta name="description" content="Explore upcoming and completed projects on PS Bank - The Next Generation Crypto Bank" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageHeader title="Project" text="Home" text2="Project" />
        
        {/* Upcoming Projects Section */}
        <section className="project padding-top padding-bottom">
          <div className="container">
            <div className="section-header section-header--middle">
              <div className="section-header__content">
                <div className="section-header__titlebar">
                  <Simple subTitle="Projects" title="Upcoming IDOs" />
                </div>
              </div>
            </div>
            <UpcommingTwo />
          </div>
        </section>
        
        {/* Completed Projects Section */}
        <section className="project padding-top padding-bottom bg--primary-color">
          <div className="container">
            <div className="section-header section-header--middle">
              <div className="section-header__content">
                <div className="section-header__titlebar">
                  <Simple subTitle="Completed" title="Previous Projects" />
                </div>
                <Link href="#" className="default-btn default-btn--small">View Rank</Link>
              </div>
            </div>
            <CompletedTwo />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Project;

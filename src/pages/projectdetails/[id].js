import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/base/PageHeader";
import InvestmentForm from "@/components/InvestmentForm";

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error loading project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-message">Loading project details...</div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="error-container">
          <h1>Project Not Found</h1>
          <p>
            The project you\'re looking for doesn\'t exist or has been removed.
          </p>
          <Link href="/project" className="default-btn">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{project.title} - Project Details</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      <section className="project-details-section padding-top padding-bottom">
        <div className="container">
          <div className="project-details-wrapper">
            <div className="project-thumb">
              <Image
                src={project.image || "/images/igo/item/01.jpg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>

            <div className="project-content">
              <div className="project-header">
                <h2>{project.title}</h2>
                <span className="project-symbol">{project.symbol}</span>
              </div>

              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-label">Price</span>
                  <span className="stat-value">{project.idoPrice}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Hard Cap</span>
                  <span className="stat-value">{project.hardCap}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Soft Cap</span>
                  <span className="stat-value">{project.softCap}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Supply</span>
                  <span className="stat-value">{project.totalSupply}</span>
                </div>
              </div>

              <div className="project-description">
                <h3>About Project</h3>
                <p>{project.description}</p>
              </div>

              {project.features && (
                <div className="project-features">
                  <h3>Features</h3>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tokenomics?.distribution && (
                <div className="project-tokenomics">
                  <h3>Tokenomics</h3>
                  <div className="tokenomics-grid">
                    {project.tokenomics.distribution.map((item, index) => (
                      <div key={index} className="tokenomics-item">
                        <span className="tokenomics-category">
                          {item.category}
                        </span>
                        <span className="tokenomics-percentage">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="project-investment mt-5">
                <h3>Invest In Project</h3>
                <div className="investment-box p-4 rounded-lg bg-opacity-10 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Current Price:</span>
                    <span className="text-xl font-bold">
                      {project.idoPrice}
                    </span>
                  </div>
                  <InvestmentForm projectPrice={project.idoPrice} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetails;

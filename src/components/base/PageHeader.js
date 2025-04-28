import Link from "next/link";
const PageHeader = ({ title = "Page Header", text = "text" }) => {
  return (
    <section
      className="page-header"
      style={{ backgroundImage: "url(/images/header/bg_.jpg)" }}
    >
      <div className="container">
        <div className="page-header__content text-center">
          <h2>{title}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {text}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
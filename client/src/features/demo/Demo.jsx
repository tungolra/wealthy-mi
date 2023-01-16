import React, { useRef } from "react";
import Page from "../../components/page/Page";
import PageContent from "../../components/page-content/PageContent";
import { Link } from "react-router-dom";

import FeatureList from "./featureChecklist.json";
import Sprint from "./Sprint";

const ProfileSaad = "/assets/images/ProfileSaad.jpeg";
const ProfileRalph = "/assets/images/ProfileRalph.jpeg";

const Demo = () => {
  const featureRef = useRef(null);
  const onClickFeatures = () => {
    featureRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <>
      <Page showTopbar={false}>
        <PageContent>
          <div className="container py-2">
            <div className="p-8 bg-info rounded">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-10 mb-md-0 px-5 py-2 me-auto">
                  <h3 className="h4 fw-bold">
                    <span className="text-white">Wealthy Mi</span>
                  </h3>
                  <p className="mb-10 small text-white font-italic">
                    Your finances, your way.
                  </p>
                  <Link
                    className="btn btn-lg p-0 text-white d-flex align-items-center mb-1"
                    href="#"
                    onClick={() => onClickFeatures()}
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z"
                        fill="#D7D5F8"
                      >
                      </path>
                    </svg>
                    <span className="ms-2">
                      Checkout Our Upcoming Features!
                    </span>
                  </Link>
                </div>
                <div className="col-12 col-md-auto">
                  <img
                    className="d-none d-md-block img-fluid rounded"
                    style={{ height: "12rem" }}
                    src="https://cdn.stocksnap.io/img-thumbs/960w/male-professional_6QXAIH13O6.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </PageContent>
        <PageContent>
          <div className="container py-2">
            <div className="p-8 bg-success rounded">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 col-lg-auto ">
                  <img
                    className="d-none d-md-block img-fluid rounded"
                    style={{ height: "12rem" }}
                    src={process.env.PUBLIC_URL + ProfileSaad}
                    alt=""
                  />
                </div>
                <div className="col-12 col-md-6 mb-10 mb-md-0 px-5 py-2 me-auto">
                  <h3 className="h4 fw-bold">
                    <span className="text-white">About Mi : Saad Khan</span>
                  </h3>
                  <p className="mb-10 small text-white font-italic">
                    Front End Developer - The Sass Student
                  </p>
                  <a
                    className="btn btn-lg p-0 text-white d-flex align-items-center"
                    href="https://www.linkedin.com/in/saad-khan-softwaredev/"
                    target="_blank"
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z"
                        fill="#D7D5F8"
                      >
                      </path>
                    </svg>
                    <span className="ms-2">
                      Connect with me!
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageContent>

        <PageContent>
          <div className="container py-2">
            <div className="p-8 bg-danger rounded">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-10 mb-md-0 px-5 py-2 me-auto ">
                  <h3 className="h4 fw-bold">
                    <span className="text-white">About Mi: Ralph Tungol</span>
                  </h3>
                  <p className="mb-10 small text-white font-italic">
                    Backend Developer - The Node Knower
                  </p>
                  <a
                    className="btn btn-lg p-0 text-white d-flex align-items-center"
                    href="https://www.linkedin.com/in/ralph-tungol-b34b13226/"
                    target="_blank"
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z"
                        fill="#D7D5F8"
                      >
                      </path>
                    </svg>
                    <span className="ms-2">Connect with me!</span>
                  </a>
                </div>
                <div className="col-12 col-md-auto">
                  <img
                    className="d-none d-md-block img-fluid rounded"
                    style={{ height: "12rem" }}
                    src={process.env.PUBLIC_URL + ProfileRalph}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </PageContent>
        <PageContent>
          <div ref={featureRef} className="container py-2">
            <div className="px-8 bg-dark rounded ">
              <h1 className="text-white px-5 pt-2 d-flex justify-content-center">
                Features and Logs
              </h1>
              <div className="d-flex justify-content-center">
                <hr className="divider text-white w-75" />
              </div>
              <div className="d-flex justify-content-center text-white px-5">
                <p>
                  Wealthy Mi is a modern personal finance web application
                  developed as a fullstack development exercise by Saad Khan and
                  Ralph Tungol. Wealthy Mi is a work in progress and follows an
                  agile development process. Check out our &nbsp;
                  <a
                    className="text-white fw-bold"
                    target="_blank"
                    href="https://ssjkhan-dev.cloud.mattermost.com/plugins/focalboard/team/upxt4777bjnbbksgseh6rp5sqc/shared/b36soedahfffumydnaxa7f6jyxw/v3633xjehi7gqikhgu1gkkcscec?r=kcr11b9h8i4thcnx6fr8mi514gy"
                  >
                    workflow here
                  </a>, and stay tuned for more!
                </p>
              </div>
              {FeatureList.map((sprint) => <Sprint sprint={sprint} />)}
              <div className="d-flex justify-content-center">
                <hr className="divider text-white w-75" />
              </div>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default Demo;

// import "../img/carousel-1.jpg"
import {
  faBook,
  faGlobe,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
export default function Service() {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <div className="text-primary mb-4">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      size="3x"
                      className="text-primary"
                    />
                  </div>
                  <h5 className="mb-3">Skilled Instructors</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <div className="text-primary mb-4">
                    <FontAwesomeIcon
                      icon={faGlobe}
                      size="3x"
                      className="text-primary"
                    />
                  </div>

                  {/* <i className="fa fa-3x fa-globe text-primary mb-4"></i> */}
                  <h5 className="mb-3">Online Classes</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <div className="text-primary mb-4">
                    <FontAwesomeIcon
                      icon={faHome}
                      size="3x"
                      className="text-primary"
                    />
                  </div>
                  <h5 className="mb-3">Home Projects</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <div className="text-primary mb-4">
                    <FontAwesomeIcon
                      icon={faBook}
                      size="3x"
                      className="text-primary"
                    />
                  </div>
                  <h5 className="mb-3">Book Library</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

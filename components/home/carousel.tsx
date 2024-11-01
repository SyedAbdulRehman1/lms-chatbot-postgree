"use client";
import Slider from "react-slick";
import Image from "next/image";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full overflow-hidden p-0 mb-5">
      <Slider {...settings} className="header-carousel position-relative">
        <div className="position-relative">
          <Image
            src="/img/carousel-1.jpg"
            alt="Carousel Image"
            width={800}
            height={600}
            quality={100}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    The Best Online Learning Platform
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                    diam no. Kasd rebum ipsum et diam justo clita et kasd
                    rebum sea sanctus eirmod elitr.
                  </p>
                  <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                    Read More
                  </a>
                  <a href="#" className="btn btn-light py-md-3 px-md-5 animated slideInRight">
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <Image
            src="/img/carousel-2.jpg"
            alt="Carousel Image"
            width={800}
            height={600}
            quality={100}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    Get Educated Online From Your Home
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                    diam no. Kasd rebum ipsum et diam justo clita et kasd
                    rebum sea sanctus eirmod elitr.
                  </p>
                  <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                    Read More
                  </a>
                  <a href="#" className="btn btn-light py-md-3 px-md-5 animated slideInRight">
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

// // import "../img/carousel-1.jpg"
// import Image from "next/image";
// export default function Carousel() {
//   return (
//     <>
//       <div className="container-fluid p-0 mb-5">
//         <div className="owl-carousel header-carousel position-relative">
//           <div className="owl-carousel-item position-relative">
//             {/* <img className="img-fluid" src="/img/carousel-1.jpg" alt="" /> */}
//             <Image
//               src="/img/carousel-1.jpg"
//               alt="Carousel Image"
//               width={800}
//               height={600}
//               quality={100}
//               layout="responsive"
//             />

//             <div
//               className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
//               style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
//             >
//               <div className="container">
//                 <div className="row justify-content-start">
//                   <div className="col-sm-10 col-lg-8">
//                     <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
//                       Best Online Courses
//                     </h5>
//                     <h1 className="display-3 text-white animated slideInDown">
//                       The Best Online Learning Platform
//                     </h1>
//                     <p className="fs-5 text-white mb-4 pb-2">
//                       Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
//                       diam no. Kasd rebum ipsum et diam justo clita et kasd
//                       rebum sea sanctus eirmod elitr.
//                     </p>
//                     <a
//                       href="#"
//                       className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
//                     >
//                       Read More
//                     </a>
//                     <a
//                       href="#"
//                       className="btn btn-light py-md-3 px-md-5 animated slideInRight"
//                     >
//                       Join Now
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="owl-carousel-item position-relative">
//             <Image
//               src="/img/carousel-2.jpg"
//               alt="Carousel Image"
//               width={800}
//               height={600}
//               quality={100}
//               layout="responsive"
//             />
//             <div
//               className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
//               style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
//             >
//               <div className="container">
//                 <div className="row justify-content-start">
//                   <div className="col-sm-10 col-lg-8">
//                     <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
//                       Best Online Courses
//                     </h5>
//                     <h1 className="display-3 text-white animated slideInDown">
//                       Get Educated Online From Your Home
//                     </h1>
//                     <p className="fs-5 text-white mb-4 pb-2">
//                       Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
//                       diam no. Kasd rebum ipsum et diam justo clita et kasd
//                       rebum sea sanctus eirmod elitr.
//                     </p>
//                     <a
//                       href="#"
//                       className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
//                     >
//                       Read More
//                     </a>
//                     <a
//                       href="#"
//                       className="btn btn-light py-md-3 px-md-5 animated slideInRight"
//                     >
//                       Join Now
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

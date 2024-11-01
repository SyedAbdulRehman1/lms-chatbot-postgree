import Head from 'next/head';
// import Header from '../../components/Header';
import Carousel from '@/components/home/carousel';
import Header from '@/components/home/HeaderWebsite';
import Service from '@/components/home/service';
import AboutUs from '@/components/home/aboutUs';
import Categories from '@/components/home/categories';
import Courses from '@/components/home/courses';
import Team from '@/components/home/team';
import Testimonial from '@/components/home/testimonial';

export default function Home() {
  return (
    <div>
      
      <Carousel />
      <Service />
      <AboutUs />
      <Categories />
      <Courses />
      <Team />
      <Testimonial />
      {/* Add other components here */}

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>

     
    </div>
  );
}

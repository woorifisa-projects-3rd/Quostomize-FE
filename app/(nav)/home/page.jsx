"use client";

import HomeHeader from '../../../components/home/home-header';
import HomeBody1 from '../../../components/home/home-body1';
import HomeBody2 from '../../../components/home/home-body2';
import HomeBody3 from '../../../components/home/home-body3';
import HomeBody4 from '../../../components/home/home-body4';
import HomeFoot from '../../../components/home/home-foot';

const Home = () => {
  return (

    <div className={`h-full overflow-scroll [&::-webkit-scrollbar]:hidden`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
      <HomeHeader /><br />
      <HomeBody1 /><br />
      <HomeBody2 /><br />
      <HomeBody3 /><br />
      <HomeBody4 /><br />
      <HomeFoot />
    </div>
  );
}
export default Home;
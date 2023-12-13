import Banner from "../../components/Banner";
import Trending from "../../components/Trending";
import Posts from './../../components/common/Posts/Posts';
import Discover from './../../components/Discover';

export default function Demo() {

  return (
    <>
      <Banner />
      <Trending />
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">
        <div className="flex-[1.5]">
          <Posts  />
        </div>
        <div className="flex-1 relative">
          <Discover />
        </div>
      </div>
    </>
  )
}

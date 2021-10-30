import { Footer } from "./Footer/Footer";
import { RecentPost } from "./RecentPost/RecentPost";
import { RedditPremium } from "./RedditPremium/RedditPremium";
import { CreatePost } from "./CreatePost/CreatePost";
import { TopCommunity } from "./TopCommunity/TopCommunity";

/* import { Categories } from "./Categories/Categories"; */
export const Sidebar = () => {
  return (
    <>
      <TopCommunity />
      <RedditPremium />
      <CreatePost />
      {/* <RecentPost /> */}
      {/* <Categories /> */}
      <Footer />
    </>
  );
};

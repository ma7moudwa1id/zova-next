import CategoriesScreen from "@/features/categories/screens/Categories.Screen";
import FeaturdProductsScreens from "@/features/fetured-products/screens/FeaturdProducts.Screens";
import SwiperSlider from "../components/SwiperSlider";
import Prons from "../components/Prons";
import Banners from "../components/Banners";
import UpdatesNews from "../components/UpdatesNews";

export default function HomeScreen() {
  return (
    <>
      <SwiperSlider />
      <Prons/>
      <CategoriesScreen />
      <Banners/>
      <FeaturdProductsScreens />
      <UpdatesNews/>
    </>
  );
}

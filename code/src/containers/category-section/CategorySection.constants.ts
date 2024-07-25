import computerImage from "@/assets/images/home-page/category-section/computer-image.jpg";
import mobileImage from "@/assets/images/home-page/category-section/mobile-image.jpg";
import tabletImage from "@/assets/images/home-page/category-section/tablet-image.jpg";
import routes from "@/constants/routes";

const categorySectionData = [
  {
    id: 1,
    label: "categorySection.computers",
    image: computerImage,
    href: routes.computers.path
  },
  {
    id: 2,
    label: "categorySection.tablets",
    image: tabletImage,
    href: routes.tablets.path
  },
  {
    id: 3,
    label: "categorySection.mobile",
    image: mobileImage,
    href: routes.mobiles.path
  }
];

export default categorySectionData;

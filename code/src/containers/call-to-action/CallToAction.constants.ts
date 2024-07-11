import computerBackground from "@/assets/images/home-page/call-to-action-section/computer.webp";
import phoneBackground from "@/assets/images/home-page/call-to-action-section/phone.webp";
import routes from "@/constants/routes";

const callToActionItems = [
  {
    titleTranslationKey: "callToAction.mobiles.title",
    descriptionTranslationKey: "callToAction.mobiles.description",
    captionTranslationKey: "callToAction.mobiles.caption",
    buttonLabelTranslationKey: "callToAction.mobiles.buttonLabel",
    linkTo: routes.mobiles.path,
    imageUrl: phoneBackground
  },
  {
    titleTranslationKey: "callToAction.computers.title",
    descriptionTranslationKey: "callToAction.computers.description",
    captionTranslationKey: "callToAction.computers.caption",
    buttonLabelTranslationKey: "callToAction.computers.buttonLabel",
    linkTo: routes.computers.path,
    imageUrl: computerBackground
  }
];

export default callToActionItems;

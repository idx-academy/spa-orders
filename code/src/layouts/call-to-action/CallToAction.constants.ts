import phoneBackground from "@/assets/images/home-page/call-to-action-section/phone.webp";
import computerBackground from "@/assets/images/home-page/call-to-action-section/computer.webp";

const callToActionItems = [
  {
    titleTranslationKey: "callToAction.phones.title",
    descriptionTranslationKey: "callToAction.phones.description",
    captionTranslationKey: "callToAction.phones.caption",
    buttonLabelTranslationKey: "callToAction.phones.buttonLabel",
    linkTo: "/",
    imageUrl: phoneBackground
  },
  {
    titleTranslationKey: "callToAction.computers.title",
    descriptionTranslationKey: "callToAction.computers.description",
    captionTranslationKey: "callToAction.computers.caption",
    buttonLabelTranslationKey: "callToAction.computers.buttonLabel",
    linkTo: "/",
    imageUrl: computerBackground
  }
];

export default callToActionItems;

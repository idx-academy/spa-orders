import phoneBackground from "@/assets/images/home-page/call-to-action-section/phone.webp";
import computerBackground from "@/assets/images/home-page/call-to-action-section/computer.webp";

const callToActionItems = [
  {
    titleTranslationKey: "callToActionSection.phones.title",
    descriptionTranslationKey: "callToActionSection.phones.description",
    captionTranslationKey: "callToActionSection.phones.caption",
    buttonLabelTranslationKey: "callToActionSection.phones.buttonLabel",
    linkTo: "/",
    imageUrl: phoneBackground
  },
  {
    titleTranslationKey: "callToActionSection.computers.title",
    descriptionTranslationKey: "callToActionSection.computers.description",
    captionTranslationKey: "callToActionSection.computers.caption",
    buttonLabelTranslationKey: "callToActionSection.computers.buttonLabel",
    linkTo: "/",
    imageUrl: computerBackground
  }
];

export default callToActionItems;

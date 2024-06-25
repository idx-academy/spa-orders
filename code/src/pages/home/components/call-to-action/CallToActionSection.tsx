import AppBox from "@/components/app-box/AppBox";
import CallToActionItem from "@/layouts/call-to-action-item/CallToActionItem";

import callToActionItems from "@/pages/home/components/call-to-action/CallToAction.constants";

import "@/pages/home/components/call-to-action/CallToActionSection.scss";

const CallToActionSection = () => {
  return (
    <AppBox className="call-to-action">
      {callToActionItems.map((itemData) => (
        <CallToActionItem key={itemData.titleTranslationKey} {...itemData} />
      ))}
    </AppBox>
  );
};

export default CallToActionSection;

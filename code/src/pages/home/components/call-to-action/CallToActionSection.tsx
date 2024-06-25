import AppContainer from "@/components/app-container/AppContainer";
import CallToActionItem from "@/layouts/call-to-action-item/CallToActionItem";

import callToActionItems from "@/pages/home/components/call-to-action/CallToAction.constants";

import "@/pages/home/components/call-to-action/CallToActionSection.scss";

const CallToActionSection = () => {
  return (
    <AppContainer maxWidth="xl" className="call-to-action">
      {callToActionItems.map((itemData) => (
        <CallToActionItem key={itemData.titleTranslationKey} {...itemData} />
      ))}
    </AppContainer>
  );
};

export default CallToActionSection;

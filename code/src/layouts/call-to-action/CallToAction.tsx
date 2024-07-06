import callToActionItems from "@/layouts/call-to-action/CallToAction.constants";
import CallToActionItem from "@/layouts/call-to-action/components/call-to-action-item/CallToActionItem";

import AppBox from "@/components/app-box/AppBox";

import "@/layouts/call-to-action/CallToAction.scss";

const CallToAction = () => {
  return (
    <AppBox className="call-to-action">
      {callToActionItems.map((itemData) => (
        <CallToActionItem key={itemData.titleTranslationKey} {...itemData} />
      ))}
    </AppBox>
  );
};

export default CallToAction;

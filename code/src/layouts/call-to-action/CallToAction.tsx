import AppBox from "@/components/app-box/AppBox";
import CallToActionItem from "@/layouts/call-to-action/components/call-to-action-item/CallToActionItem";
import callToActionItems from "@/layouts/call-to-action/CallToAction.constants";

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

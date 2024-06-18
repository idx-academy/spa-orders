import applicationModuleI18n from "@/shared/modules/application/i18n";
import dashboardI18n from "@/pages/dashboard/i18n";

const messages = {
  en: {
    ...applicationModuleI18n.en,
    ...dashboardI18n.en,
  },
  uk: {
    ...applicationModuleI18n.uk,
    ...dashboardI18n.uk,
  },
};

export default messages;

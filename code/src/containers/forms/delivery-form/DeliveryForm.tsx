import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import OrderSummary from "@/containers/order-summary/OrderSummary";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import AppTypography from "@/components/app-typography/AppTypography";

import { deliveryMethods } from "@/constants/deliveryMethods";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import { PostAddress } from "@/types/delivery.types";
import { PostAddressValidationScheme } from "@/utils/validators/deliveryScheme";

import "@/containers/forms/delivery-form/DeliveryForm.scss";

type DeliveryFormProps = {
  totalPrice: number;
};

const DeliveryForm = ({ totalPrice }: DeliveryFormProps) => {
  const { id, firstName, lastName, email } = useGetUserDetails();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm<PostAddress>({
    resolver: zodResolver(PostAddressValidationScheme)
  });

  const [createOrder, { isLoading }] = useCreateOrder();

  const onSubmit = (postAddress: PostAddress) => {
    createOrder({
      userId: id,
      firstName,
      lastName,
      email,
      ...postAddress
    });
  };

  const deliveryMethodItems = deliveryMethods.map(
    ({ translationKey, value, image }) => (
      <AppMenuItem
        key={value}
        value={value}
        className="delivery-form__body-item"
      >
        <AppBox
          component="img"
          src={image}
          alt="delivery method"
          className="delivery-form__method-image"
        />
        <AppTypography translationKey={translationKey} />
      </AppMenuItem>
    )
  );

  return (
    <AppBox
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="delivery-form"
    >
      <AppBox className="delivery-form__body">
        <AppTypography
          variant="h3"
          translationKey="deliveryForm.title"
          className="delivery-form__body-title"
        />
        <AppInput
          {...register("city")}
          error={Boolean(errors.city)}
          data-cy="delivery-city"
          labelTranslationKey="deliveryForm.city"
          className="delivery-form__body-input"
        />
        <AppInput
          {...register("department")}
          error={Boolean(errors.department)}
          labelTranslationKey="deliveryForm.department"
          data-cy="delivery-department"
          className="delivery-form__body-input"
        />
        <AppSelect
          {...register("deliveryMethod")}
          defaultValue={deliveryMethods[0].value}
          labelId="delivery-method"
          label="deliveryForm.postMethod"
          error={Boolean(errors.deliveryMethod)}
          data-cy="delivery-method"
          className="delivery-form__method-select"
          inputProps={{
            className: "delivery-form__method-select-input"
          }}
        >
          {deliveryMethodItems}
        </AppSelect>
      </AppBox>
      <OrderSummary
        isDisabled={!isValid}
        isLoading={isLoading}
        totalPrice={totalPrice}
      />
    </AppBox>
  );
};

export default DeliveryForm;

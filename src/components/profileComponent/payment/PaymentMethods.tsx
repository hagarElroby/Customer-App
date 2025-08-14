import { svgs } from "@/components/icons/svgs";
import CustomButton from "@/components/shared/CustomButton";
import TitleDesc from "@/components/shared/TitleDesc";
import { useProfile } from "@/hooks/userProfile";
import DizzlyBalanceCard from "./DizzlyBalanceCard";

const PaymentMethods = () => {
  const { profile } = useProfile();
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <TitleDesc
          isProfileTitle
          title="Payment Methods"
          description=" Manage your saved cards and add new ones for faster checkout. All card details are securely stored and encrypted."
        />

        <CustomButton
          className="text-sm font-bold uppercase"
          title="Add Payment Methods"
          icon={svgs.redPlus}
          bgColor="#FFF4F4"
          color="#700c18"
          fontWight="700"
          borderColor="none"
          hoverIcon={svgs.redPlus}
          hoverBgColor="#FFFFFF"
          hoverBorderColor="#700c18"
          //TODO
          onClick={() => ""}
        />
      </div>

      <div className="flex flex-col gap-3">
        {profile && (
          <DizzlyBalanceCard
            balance={profile?.walletMoney || 0}
            available={profile?.walletMoney || 0}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;

"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeText from "@/components/profileComponent/WelcomeText";
import HrLine from "@/components/shared/HrLine";
import ProfileTabs from "@/components/profileComponent/ProfileTabs";
import Loading from "@/components/shared/Loading";
import PersonalInfo from "@/components/profileComponent/PersonalInfo";
import { AppDispatch, RootState } from "@/redux/store";
import { ProfileModel } from "@/types/user";
import { getMyProfile } from "@/services/profile";
import { toast } from "sonner";
import { setProfileData } from "@/redux/profileSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { userProfileData } = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>();

  const tabNames = [
    "Personal Info",
    "Payment Methods",
    "Addresses",
    "Orders",
    "Returns",
    "Setting",
  ];

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      await getMyProfile({
        onSuccess: (data) => {
          dispatch(setProfileData(data));
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
          toast.error(err.description);
        },
      });
    };

    getProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-homeBg">
      {loading && <Loading />}
      {!loading && userProfileData && (
        <div className="flex flex-col gap-6 mx-12 my-5">
          <WelcomeText name={userProfileData?.firstName} />
          <ProfileTabs tabs={tabNames} />
        </div>
      )}
      l
    </div>
  );
};
export default Page;

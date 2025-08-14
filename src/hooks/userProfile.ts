import { useEffect, useState, useCallback } from "react";
import { getMyProfile } from "@/services/profile";
import { ProfileModel } from "@/types/user";
import { ResponseError } from "@/types/error-types";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(() => {
    setLoading(true);
    getMyProfile({
      onSuccess: (data) => {
        setProfile(data);
        setLoading(false);
      },
      onError: (_err: ResponseError) => {
        setProfile(null);
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, refetchProfile: fetchProfile };
}

import { useAuthUser } from '~/recoil/auth';

export const useUser = () => {
  const { user } = useAuthUser();
  return { user };
};

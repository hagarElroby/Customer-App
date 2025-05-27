const checkAccess = (role: string, pathname: string): boolean => {
  if (pathname.startsWith("/adminPanel/") && role !== "ADMIN") {
    return false;
  }
  if (pathname.startsWith("/vendor/") && role !== "SELLER") {
    return false;
  }
  if (pathname.startsWith("/superAdminPanel/") && role !== "SUPERADMIN") {
    return false;
  }
  if (pathname.startsWith("/user/") && role !== "USER") {
    return false;
  }
  return true;
};
export default checkAccess;

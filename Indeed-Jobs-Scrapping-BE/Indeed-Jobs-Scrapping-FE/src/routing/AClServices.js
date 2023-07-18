import { VALID_ROUTES_BY_ROLE } from "./RoutesWithRoles";

class AclService {
  constructor(role) {
    this.role = role;
    this.userAccess = VALID_ROUTES_BY_ROLE[this.role];
  }
  get redirectUrl() {
    return this.userAccess?.redirectUrl ?? "/not-found";
  }

  get landingPage() {
    return this.userAccess?.landingUrl ?? "/not-found";
  }

  hasPermission(path) {
    return this.userAccess?.paths.includes(path);
  }
}

export default AclService;

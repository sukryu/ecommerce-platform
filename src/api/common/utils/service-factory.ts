import { AuthService } from '../../services/auth/auth.service';
import { RoleService } from '../../services/role/role.service';
import { UserService } from '../../services/user/user.service';

export class ServiceFactory {
  private static authService: AuthService;
  private static roleService: RoleService;
  private static userService: UserService;

  static getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService();
    }
    return this.authService;
  }

  static getRoleService(): RoleService {
    if (!this.roleService) {
      this.roleService = new RoleService();
    }
    return this.roleService;
  }

  static getUserService(): UserService {
    if (!this.userService) {
      this.userService = new UserService();
    }
    return this.userService;
  }
}
export class User {
  id: number | null = null;
  email: string | null = null;
  roles: string[] = [];
  password: string | null = null;
  lastName: string | null = null;
  firstName: string | null = null;
  phoneNumber: string | null = null;

  constructor() {
    this.roles = [];
  }
}

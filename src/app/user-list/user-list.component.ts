import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserListComponent {
  public header: string = 'Angular users tasks';
  public newLogin!: string;
  public newPassword!: string;
  public newEmail!: string;
  public userList!: string;
  public editIndex!: number;
  public editStatus: boolean = false;
  public userData: { login: string; password: string; email: string }[] = [];
  public isFocused: boolean = false;
  public isLoginFocused: boolean = false;
  public isPasswordFocused: boolean = false;
  public isEmailFocused: boolean = true;

  loginRegExp = /^\w{4,16}$/;
  passRegExp = /^[a-z0-9_\-\.]{4,16}$/;
  emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  [key: string]: any;


  onInputBlur(fieldLogin: string): void {
    this['is' + this.capitalizeFirstLetter(fieldLogin) + 'Focused'] = true;
  }
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  isValidForm(): boolean {
    return this.isValidLogin() && this.isValidPassword() && this.isValidEmail();
  }

  isValidLogin(): boolean {
    return this.loginRegExp.test(this.newLogin);
  }
  isValidPassword(): boolean {
    return this.passRegExp.test(this.newPassword);
  }

  isValidEmail(): boolean {
    return this.emailRegExp.test(this.newEmail);
  }
  addUser(): void {
    const newUser = { login: this.newLogin, password: this.newPassword, email: this.newEmail };
    this.userData.push(newUser);
    this.clearInputs();
  }
  editUser(index: number): void {
    const user = this.userData[index];
    this.newLogin = user.login;
    this.newPassword = user.password;
    this.newEmail = user.email;
    this.editIndex = index;
    this.editStatus = true;
  }
  deleteUser(index: number): void {
    this.userData.splice(index, 1);
  }
  saveEditUser(): void {
    const editedUser = this.userData[this.editIndex];
    editedUser.login = this.newLogin;
    editedUser.password = this.newPassword;
    editedUser.email = this.newEmail;
    this.editStatus = false;
    this.clearInputs();
  }
  private clearInputs(): void {
    this.newLogin = '';
    this.newPassword = '';
    this.newEmail = '';
  }
}


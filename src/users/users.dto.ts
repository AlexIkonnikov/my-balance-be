export class LoginUserDto {
  email: string;
  password: string;
}

export class CreateUserDto extends LoginUserDto {
  name: string;
}

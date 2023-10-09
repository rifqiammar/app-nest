import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong!' })
  @IsString({ message: 'Username harus berupa string!' })
  @Matches(/[^a-zA-Z]/, { message: 'Username harus diisi huruf!' })
  username: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong!' })
  @IsString({ message: 'Password harus berupa string!' })
  @MinLength(6, { message: 'Password harus lebih dari Atau 6 karakter!' })
  password: string;

  @IsNotEmpty({ message: 'Firstname tidak boleh kosong!' })
  @IsString({ message: 'Firstname harus berupa string!' })
  firstname: string;

  @IsNotEmpty({ message: 'Lastname tidak boleh kosong!' })
  @IsString({ message: 'Lastname harus berupa string!' })
  lastname: string;
}

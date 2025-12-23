import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/register')
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<string> {
    return this.authService.register(createUserDto);
  }

  @Post('email/login')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.validateLogin(loginDto);
  }
}

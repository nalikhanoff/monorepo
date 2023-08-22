import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    console.log(dto);
    return this.userService.login(dto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user) {
    return user;
  }
}

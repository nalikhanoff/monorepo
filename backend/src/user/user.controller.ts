import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    console.log(dto);
    return this.userService.login(dto);
  }
}

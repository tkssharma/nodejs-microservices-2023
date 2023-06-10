import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import RegisterDto from './dto/register.dto';
import { LocalAuthGuard } from './local.auth.guard';
import RequestWithUser from './request-with.user';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @HttpCode(201)
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'user registered successfully',
  })
  async register(@Body() body: RegisterDto) {
    return this.authenticationService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'user logged in successfully',
  })
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const token = this.authenticationService.getCookiesWithJwtToken(user);
    return {
      token,
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'user session logout in successfully',
  })
  async logout(@Req() request: RequestWithUser) {
    const { user } = request;
    return null;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}

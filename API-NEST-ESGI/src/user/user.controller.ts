import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AddRequest,
  AddResponse,
  UserCRUDServiceController,
  UserCRUDServiceControllerMethods,
} from 'src/stubs/user/v1alpha/user';
import { Metadata } from '@grpc/grpc-js';

@Controller('user')
@UserCRUDServiceControllerMethods()
export class UserController implements UserCRUDServiceController {
  constructor(private readonly userService: UserService) {}

  async add(request: AddRequest, metadata: Metadata): Promise<AddResponse> {
    return {
      user: await this.userService.add({
        firstname: request.firstname,
        lastname: request.lastname,
        email: request.email,
      }),
    };
  }
}

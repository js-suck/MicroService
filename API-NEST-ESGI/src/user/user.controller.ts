import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { Metadata } from "@grpc/grpc-js";
import {
  UpdateResponse,
  AddRequest,
  FindAllResponse,
  DeleteRequest,
  DeleteResponse,
  UserCRUDServiceControllerMethods,
  AddResponse,
  GetResponse,
  GetRequest,
  UpdateRequest,
  UserCRUDServiceController,
  FindByNameResponse,
  NameRequest,
} from "../bank-api/src/stubs/user/v1alpha/user";
import { Observable } from "rxjs";
import { EmptyRequest } from "bank-api/src/stubs/user/v1alpha/user";

@Controller("user")
@UserCRUDServiceControllerMethods()
export class UserController implements UserCRUDServiceController {
  constructor(private readonly userService: UserService) {}

  async add(request: AddRequest, metadata: Metadata): Promise<AddResponse> {
    const { firstname, lastname, email } = request.data;
    const user = await this.userService.add({
      firstname,
      lastname,
      email,
      role: 1,
    });
    return { user };
  }

  async findOne(request: GetRequest, metadata: Metadata): Promise<GetResponse> {
    const user = await this.userService.findOne(request.id);
    return { user };
  }

  async update(
    request: UpdateRequest,
    metadata: Metadata
  ): Promise<UpdateResponse> {
    const { id, data } = request;
    const user = await this.userService.update(id, data);
    return { user };
  }

  async delete(
    request: DeleteRequest,
    metadata: Metadata
  ): Promise<DeleteResponse> {
    const { id } = request;
    const user = await this.userService.delete(id);
    return { user };
  }

  async findAll(
    request: EmptyRequest,
    metadata: Metadata
  ): Promise<FindAllResponse> {
    const users = await this.userService.findAll();
    return { users };
  }

  findByName(
    request: NameRequest,
    metadata?: Metadata
  ):
    | FindByNameResponse
    | Promise<FindByNameResponse>
    | Observable<FindByNameResponse> {
    throw new Error("Method not implemented.");
  }
}

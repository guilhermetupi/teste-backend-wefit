import Express, { Request, Response } from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import {
  SigninPresenterPort,
  SignupPresenterPort,
} from "@/ports/http/presenters/auth";

export class AuthExpressRouteAdapter
  implements HttpRouteAdapterPort<Express.Router>
{
  public readonly name = "auth";

  constructor(
    private readonly signinPresenterAdapter: SigninPresenterPort,
    private readonly signupPresenterAdapter: SignupPresenterPort
  ) {}

  setup(router: Express.Router): void {
    router.post(`/signin`, async (req: Request, res: Response) => {
      const { email, password } = req.body as SigninPresenterPort.Param;

      const { status, data, message } =
        await this.signinPresenterAdapter.execute({
          email,
          password,
        });

      res.status(status).json({ data, message });
    });

    router.post(`/signup`, async (req: Request, res: Response) => {
      const { email, password, passwordConfirmation } =
        req.body as SignupPresenterPort.Param;

      const { status, data, message } =
        await this.signupPresenterAdapter.execute({
          email,
          password,
          passwordConfirmation,
        });

      res.status(status).json({ data, message });
    });
  }
}

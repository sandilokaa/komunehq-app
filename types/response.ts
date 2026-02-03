import { Entity } from "./entity";

export interface IResponseProps<T> {
  status: boolean;
  data: T;
  message?: string;
}

export class Response<T> extends Entity<IResponseProps<T>> {
  static create<T>(props: IResponseProps<T>): Response<T> {
    return new Response(props);
  }

  unmarshall(): IResponseProps<T> {
    const { status, data, message } = this._props;

    return {
      status,
      data,
      ...(message && { message }),
    };
  }
}

export abstract class Template {
  protected data: any;

  constructor(data: any) {
    this.data = data;
  }

  public abstract getMessage(): string;
}
export class Option {
  type: string = "";
  value: string = "";
  name: string = "";
  isChecked: boolean = false;

  toString(): string {
    return this.name;
  }
}
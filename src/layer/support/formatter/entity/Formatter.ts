// extension point
export interface FormatterMappings {}

export abstract class Formatter<I extends string | number = string | number> {
  abstract format(raw: I): string;
}

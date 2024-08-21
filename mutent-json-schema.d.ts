/// <reference types="ajv" />
/// <reference types="mutent" />

import type { default as Ajv, Options as AjvOptions } from "ajv";
import type { MutentOptions } from "mutent";

export interface MutentJsonSchemaOptions {
  /**
   * Custom AJV instance.
   */
  ajv?: Ajv;
  /**
   * Custom AJV options.
   */
  ajvOptions?: AjvOptions;
  /**
   * JSON Schema definition.
   */
  schema: Record<string, any>;
}

declare function mutentJsonSchema(
  options: MutentJsonSchemaOptions
): MutentOptions<{ adapter: any; entity: any; options: any; query: any }>;

export default mutentJsonSchema;

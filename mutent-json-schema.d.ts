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
  schema: any;
}

export declare function mutentJsonSchema(
  options: MutentJsonSchemaOptions
): MutentOptions<any, any, any>;

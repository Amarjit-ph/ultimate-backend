/*******************************************************************************
 * Copyright (c) 2021. Rex Isaac Raphael
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * File name:         storage.ts
 * Last modified:     21/03/2021, 11:37
 ******************************************************************************/
import {
  ClassType,
  ClassTypeResolver,
  DecoratorTypeOptions,
  ensureReflectMetadataExists,
  TypeValueThunk,
} from '@ultimate-backend/common';

export class CoreMetadataStorage {
  instances: InstanceMetadata[] = [];

  filterableGraphqlFields: FilterableFieldMetadata[] = [];

  filterableGraphqlSchema: FilterableFieldMetadata[] = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  collectFilterableGraphqlFieldsMetadata(field: FilterableFieldMetadata) {
    this.filterableGraphqlFields.push(field);
  }

  collectFilterableGraphqlSchemaMetadata(field: FilterableFieldMetadata) {
    this.filterableGraphqlSchema.push(field);
  }

  clear() {
    this.instances = [];
    this.filterableGraphqlFields = [];
    this.filterableGraphqlSchema = [];
  }
}

export interface TypeOptions extends DecoratorTypeOptions {
  array?: boolean;
  isEnum?: boolean;
  arrayDepth?: number;
}

export interface InstanceMetadata {
  name: string;
  target: Function;
  prototype?: any;
  property?: any;
}

export interface FilterableFieldMetadata {
  getType?: TypeValueThunk;
  typeOptions?: TypeOptions;
  getObjectType?: ClassTypeResolver;
  methodName: string;
  fieldType: string | ClassType<any>;
  name: string;
  target: Function;
  objectType: any;
  filterSchema?: any;
}

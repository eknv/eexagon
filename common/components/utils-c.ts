import {withProps} from 'recompose';
import {isNull, isNullEmpty, isEmptyObject, objectFieldsAsArray} from 'Common/utils';
import {$prefix} from 'Common/utils-env';


export interface IExtract {
  $extract: (propertyName: string) => string;
  $attributes: (props: object, propsToIgnore: string[]) => string;
  $attributeValue: (propertyKey: string, valueMapper?: (name: string) => string) => any;
}

export const Extract = withProps((props: any) => {
  return {
    $extract: (propertyName: string): object => {


      let attribute: any = {};
      if (isNullEmpty(propertyName)) {
        return attribute;
      }

      let prefix = $prefix();

      /**
       * properties with prefix get precedence
       */
      if (!isNull(props[prefix + propertyName])) {
        attribute[props[prefix + propertyName]] = true;
      } else if (!isNull(props[propertyName])) {
        attribute[props[propertyName]] = true;
      }

      return attribute;
    },

    /**
     * filter the properties based on the respective end-device
     */
    $attributes: (props: any, propsToIgnore: string[]): object => {

      let attributes: any = {};
      if (isEmptyObject(props)) {
        return attributes;
      }

      let prefix = $prefix();

      const objectFields: string[] = objectFieldsAsArray(props);

      for (let propertyKey of objectFields) {

        /**
         * ignore the properties which begin with a dollar sign
         */
        if (propertyKey.startsWith("$")) {
          continue;
        }

        /**
         * filter out the properties not meant for this end-device
         */
        if (propertyKey.includes("-") && !propertyKey.includes(prefix)) {
          continue;
        }

        /**
         * filter out the properties for which a more specific one (one with end-device prefix) is provided
         */
        if (!propertyKey.includes("-") && objectFields.indexOf(`${prefix}${propertyKey}`) > -1) {
          continue;
        }

        const propertyValue = props[propertyKey]

        /**
         * remove the device prefix after doing the end-device check
         */
        if (propertyKey.includes(prefix)) {
          propertyKey = propertyKey.substring(2);
        }

        /**
         * ignore the properties which are meant to be ignored
         * these are those which are already accessed differently by using
         * methods like $extract or $attributeValue
         */
        if (!isNull(propsToIgnore) && propsToIgnore.indexOf(propertyKey) > -1) {
          continue;
        }

        attributes[propertyKey] = !isNull(propertyValue) ? propertyValue : true;
      }

      return attributes;
    },

    /**
     * return the property value considering the respective end-device
     */
    $attributeValue: (propertyKey: string, valueMapper?: (name: string) => string): any => {

      if (isNullEmpty(propertyKey)) {
        throw new Error(`#E no property key is passed: ${propertyKey}`)
      }

      let prefix = $prefix();

      let propertyValue = props[prefix + propertyKey];
      if (isNull(propertyValue)) {
        propertyValue = props[propertyKey];
      }

      /**
       * if value-mapper is provided, do the required mapping
       */
      if (!isNull(valueMapper) && !isNull(propertyValue)) {
        propertyValue = valueMapper(propertyValue);
      }

      return propertyValue;
    }

  }
})

import "react-native";

// react-native-web turns `dataSet` into data-* attributes on the DOM node (used by the print stylesheet).
declare module "react-native" {
  interface ViewProps {
    dataSet?: Record<string, string>;
  }
  interface TextProps {
    dataSet?: Record<string, string>;
  }
  interface ImageProps {
    dataSet?: Record<string, string>;
  }
  interface ScrollViewProps {
    dataSet?: Record<string, string>;
  }
}

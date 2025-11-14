export {};

declare global {
  namespace JSX {
    type HTMLTags = keyof HTMLElementTagNameMap;
    
    type EventHandlers<T extends HTMLElement> = {
      [K in keyof HTMLElementEventMap as `on${Capitalize<string & K>}`]?: (
        event: HTMLElementEventMap[K]
      ) => void;
    };
    
    type HTMLAttributes<T extends HTMLElement> = Partial<
      Pick<T, 'style' | 'id' | 'title' | 'className'>
    > & {
      class?: string;
      [attr: string]: any;
    };
    
    type Props<T extends HTMLElement> = HTMLAttributes<T> & EventHandlers<T>;
    
    type IntrinsicElements = {
      [K in HTMLTags]: Props<HTMLElementTagNameMap[K]>;
    };
    
    interface IntrinsicElements extends IntrinsicElements {}
  }
}
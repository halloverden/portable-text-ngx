export interface MarkerInterface {
  applyMarks(child: string, options: {[key:string]: any}): HTMLElement | string;
  supports(type: string): boolean;
}
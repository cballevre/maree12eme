export interface Tide {
  start: TideElement;
  end: TideElement;
  duration: number;
  hour: number;
  range: number;
}

export interface TideElement {
  type: number;
  date: string;
  time: string;
  height: number;
}

export interface TideFragment {
  hour: any;
  index: number;
  label: string;
  date: string;
  time: string;
  height: number;
}

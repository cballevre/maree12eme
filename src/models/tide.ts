export interface Tide {
  isRising: number;
  start: TideElement;
  end: TideElement;
  duration: number;
  hour: number;
  range: number;
}

export interface TideElement {
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

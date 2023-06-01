export interface BODY_FILTER {
  filter: {
    [key: string]: any;
    color?: any[];
    size?: any[];
    price?: any[];

    category?: string;
  };
  sort?: any;
  pagination?: any;
}

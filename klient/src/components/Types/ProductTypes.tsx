export interface Reviews {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: number;
  qrCode: string;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  images: string[];
  thumbnail: string;
  price: number;
  category: string;
  brand: string;
  weight: number;
  stock: number;
  tags: string[];
  sku: string;
  meta: Meta;
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: Reviews[];
  availabilityStatus: string;
  shippingInformation: string;
  warrantyInformation: string;
  dimensions: Dimensions;
}

export interface BasicProductInfo {
  id: number;
  thumbnail: string;
  quantity: number;
  price: number;
  title: string;
}

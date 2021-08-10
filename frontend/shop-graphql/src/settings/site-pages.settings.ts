export type GalleryType = {
  id: string | number;
  title: string;
  image: string;
};

export type BannerType = {
  heading: string;
  subheading: string;
  image: string;
  gallery?: GalleryType[];
};
export interface PageInfo {
  title: string;
  description: string;
  banner: BannerType;
}
export type PageName =
  | "grocery"
  | "bakery"
  | "makeup"
  | "bags"
  | "clothing"
  | "furniture";

export const sitePages: Record<PageName, PageInfo> = {
  grocery: {
    title: "Grocery - PickBazar",
    description: "Grocery Details",
    banner: {
      heading: "heading-grocery",
      subheading: "subheading-grocery",
      image: "/banner/grocery.png",
      gallery: [
        {
          id: 1,
          title: "Buy One Get One Free",
          image: "/banner/grocery-banner-img-one.jpg",
        },
        {
          id: 2,
          title: "Buy One Get One Free",
          image: "/banner/grocery-banner-img-two.jpg",
        },
      ],
    },
  },
  bakery: {
    title: "Bakery - PickBazar",
    description: "Bakery Details",
    banner: {
      heading: "heading-bakery",
      subheading: "subheading-bakery",
      image: "/banner/bakery.jpg",
    },
  },
  makeup: {
    title: "Makeup - PickBazar",
    description: "Makeup Details",
    banner: {
      heading: "heading-makeup",
      subheading: "subheading-makeup",
      image: "/banner/makeup.png",
    },
  },
  bags: {
    title: "Bags - PickBazar",
    description: "Bags Details",
    banner: {
      heading: "heading-bags",
      subheading: "subheading-bags",
      image: "/banner/bags.png",
    },
  },
  clothing: {
    title: "Clothing - PickBazar",
    description: "Clothing Details",
    banner: {
      heading: "heading-clothing",
      subheading: "subheading-clothing",
      image: "/banner/cloths.png",
    },
  },
  furniture: {
    title: "Furniture - PickBazar",
    description: "Furniture Details",
    banner: {
      heading: "heading-furniture",
      subheading: "subheading-furniture",
      image: "/banner/furniture.png",
      gallery: [
        {
          id: 1,
          title: "Exclusives Furniture",
          image: "/banner/furniture-banner-1.jpg",
        },
        {
          id: 2,
          title: "Exclusives Furniture",
          image: "/banner/furniture-banner-2.jpg",
        },
      ],
    },
  },
};

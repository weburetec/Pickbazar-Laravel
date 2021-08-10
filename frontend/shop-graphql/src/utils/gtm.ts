export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url: string) => {
  (window as any).dataLayer.push({
    event: "pageview",
    page: url,
  });
};

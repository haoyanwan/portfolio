
export const getScrollConfig = (windowHeight) => ({
  maxVirtualScroll: windowHeight * 5.75,
  breakpoints: [
    {
      virtualRange: [windowHeight * 0, windowHeight * 0.75],
      name: "static-text",
    },
    {
      virtualRange: [windowHeight * 1.75, windowHeight * 2.75],
      name: "card-scroll-phase",
    },
    {
      virtualRange: [windowHeight * 3.75, windowHeight * 4.25],
      name: "about-section",
    },
    {
      virtualRange: [windowHeight * 5.25, windowHeight * 5.75],
      name: "contact-section",
    },
  ],
});
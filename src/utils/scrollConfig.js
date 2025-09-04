
export const getScrollConfig = (windowHeight) => ({
  maxVirtualScroll: windowHeight * 2.75,
  breakpoints: [
    {
      virtualRange: [windowHeight * 0, windowHeight * 0.75],
      name: "static-text",
    },
    {
      virtualRange: [windowHeight * 1.75, windowHeight * 3.75],
      name: "card-scroll-phase",
    },

  ],
});
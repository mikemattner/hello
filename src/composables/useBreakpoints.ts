import { useBreakpoints } from '@vueuse/core';

export default () => {
  const breakpoints = useBreakpoints({
    mobile: 550,
    tablet: 730,
    desktop: 960,
    widescreen: 1152,
    fullhd: 1344,
  });

  const xs = breakpoints.smaller('mobile');
  const sm = breakpoints.smaller('tablet');
  const md = breakpoints.between('tablet', 'desktop');
  const lg = breakpoints.between('desktop', 'widescreen');
  const xl = breakpoints['fullhd'];

  return {
    xs,
    sm,
    md,
    lg,
    xl,
  };
};
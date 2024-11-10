import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const isSuperSmall = useMediaQuery({ maxWidth: "525px" });
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const isMedium = useMediaQuery({ minWidth: "768px" });
  const isLarge = useMediaQuery({ minWidth: "1024px" });
  const isXLarge = useMediaQuery({ minWidth: "1280px" });
  const is2XLarge = useMediaQuery({ minWidth: "1536px" });

  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  return {
    isSuperSmall,
    isMobile,
    isMedium,
    isLarge,
    isXLarge,
    is2XLarge,
    isPortrait,
    isRetina,
  };
};

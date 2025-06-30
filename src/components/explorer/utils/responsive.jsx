export const getResponsiveWidthClass = (width) => {
    if (width >= 2296) return "w-[25%]";
    if (width >= 1706) return "w-[30%]";
    if (width >= 1133) return "w-[33%]";
    if (width >= 950) return "w-[50%]";
    if (width >= 800) return "w-[38%]";
    return "w-full";
  };
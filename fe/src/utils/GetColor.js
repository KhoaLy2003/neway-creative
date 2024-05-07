export const getColorByPackageType = (packageType) => {
  switch (packageType) {
    case "ADVANCED":
      return "geekblue";
    case "PREMIUM":
      return "gold";
    default:
      return "gray";
  }
};

export const getColorByDurationUnit = (durationUnit) => {
  switch (durationUnit) {
    case "WEEKS":
      return "cyan";
    case "MONTHS":
      return "magenta";
    case "YEARS":
      return "purple";
    default:
      return "gray";
  }
};

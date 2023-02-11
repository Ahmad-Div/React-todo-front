const useSize = () => {
  if (window.innerWidth >= 1024) {
    return "xl";
  }
  if (window.innerWidth >= 767 && window.innerWidth < 1023) {
    return "lg";
  }
  if (window.innerWidth < 767 && window.innerWidth >= 550) {
    return "md";
  }
  if (window.innerWidth < 550) {
    return "sm";
  }
};

export default useSize;

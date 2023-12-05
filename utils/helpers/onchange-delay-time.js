export const onChangeDelayTime = (ref, onChange, seconds = 0.5) => {
  clearTimeout(ref.current);
  ref.current = setTimeout(() => {
    if (onChange) {
      onChange();
    }
  }, seconds * 1000);
};

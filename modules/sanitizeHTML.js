export const sanitizeHTML = (value) => {
  return value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

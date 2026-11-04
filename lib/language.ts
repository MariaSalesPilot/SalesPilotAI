export const getLanguage = () => {
  if (typeof window === "undefined") {
    return "es";
  }

  return localStorage.getItem("salespilotLanguage") || "es";
};

export const saveLanguage = (language: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("salespilotLanguage", language);
  }
};
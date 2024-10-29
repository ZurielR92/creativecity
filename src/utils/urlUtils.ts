export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD") // Descompone los caracteres con tilde en su versión base + tilde
      .replace(/[\u0300-\u036f]/g, "") // Elimina las tildes/acentos
      .replace(/\s+/g, "-") // Reemplaza los espacios por guiones
      .replace(/[^a-z0-9-]/g, "") // Elimina caracteres no alfanuméricos (opcional)
      .replace(/-+/g, "-") // Reemplaza múltiples guiones consecutivos por uno solo
      .replace(/^-|-$/g, ""); // Elimina guiones al inicio o al final
  };

  export const deslugify = (text: string): string => {
    return text.replace(/-/g, " ");
  };
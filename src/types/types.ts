// src/types/types.ts

// Interfaz para la información de un negocio
export interface BusinessInfo {
  sectionName: string;
  sectionId: string;
  businessId: number;
  businessName?: string; // Haciendo que la propiedad pueda ser undefined
  logo?: string;
}

// Props para el componente AddSection
export interface AddSectionProps {
  businessId: string | null;
  businessInfoProp: BusinessInfo | null;
  onSectionNameChange: (newSectionName: string) => void; // Agrega esta línea
}

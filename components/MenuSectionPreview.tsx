import React from 'react';

// Definir una interfaz para los props del componente
interface MenuSectionPreviewProps {
  sectionName: string;
  description: string;
}

const MenuSectionPreview: React.FC<MenuSectionPreviewProps> = ({ sectionName, description }) => {
  return (
    <div className="phone-preview">
      <div className="menu-section">
        <h3>{sectionName}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MenuSectionPreview;

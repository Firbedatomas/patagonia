import React, { useState, FormEvent } from 'react';
import axios from 'axios'; // Importa Axios

interface AddProductProps {
  sectionId: string;
  sectionName: string;
}

interface ProductFormData {
  productName: string;
  productDescription: string;
  // Agrega otros campos según sea necesario, como precio, imagen, etc.
}

const AddProduct: React.FC<AddProductProps> = ({ sectionId, sectionName }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    productDescription: '',
    // Inicializa otros campos aquí
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST para agregar el producto
      const response = await axios.post('/api/products', {
        userId: 123, // Reemplaza con el ID de usuario correcto
        sectionId: sectionId,
        productName: formData.productName,
        description: formData.productDescription,
        price: 0.0, // Reemplaza con el precio correcto
        // Agrega otros campos según sea necesario
      });

      // La respuesta debe contener los datos del producto creado
      const newProduct = response.data;

      // Puedes hacer algo con los datos del producto aquí si es necesario

      // Limpiar el formulario después de agregar el producto
      setFormData({
        productName: '',
        productDescription: '',
        // Inicializa otros campos aquí
      });

      console.log('Producto agregado:', newProduct);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-900">{`Agregar Producto para ${sectionName}`}</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Nombre del Producto:
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
        {/* Otros campos del formulario */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="w-96 bg-white border border-gray-200 absolute top-24 left-1/2 transform -translate-x-1/2 rounded-2xl shadow-xl z-50 p-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        ¿Estás seguro que quieres eliminar esta tarea?
      </h2>
      <p className="text-sm text-gray-500 text-center mt-1">
        Esta acción no se puede deshacer.
      </p>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={onConfirm}
          className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          Sí, eliminar
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

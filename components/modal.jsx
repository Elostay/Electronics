const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative">
        {children}
        <button className="absolute top-0 right-[20px] m-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

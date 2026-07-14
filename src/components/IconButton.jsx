export default function IconButton({ icon: Icon, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition ${className}`}
    >
      <Icon size={17} className="text-gray-600" />
    </button>
  );
}
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">

      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/20 shadow-2xl p-8">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  );
}
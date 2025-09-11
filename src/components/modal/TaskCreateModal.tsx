interface Props {
  onClose: () => void;
}

export default function TaskCreateModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        {/* Task form will go here */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>1
    </div>
  );
}

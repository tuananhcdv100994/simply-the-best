import React from 'react';

interface EditModeBarProps {
    onSave: () => void;
    onCancel: () => void;
}

const EditModeBar: React.FC<EditModeBarProps> = ({ onSave, onCancel }) => {
    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gray-800/80 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-gray-700 flex items-center space-x-4">
            <p className="text-sm font-semibold text-yellow-400">Bạn đang ở chế độ chỉnh sửa</p>
            <button
                onClick={onCancel}
                className="bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm"
            >
                Hủy
            </button>
             <button
                onClick={onSave}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm"
            >
                Lưu thay đổi
            </button>
        </div>
    );
};

export default EditModeBar;

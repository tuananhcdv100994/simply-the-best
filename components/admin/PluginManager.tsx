import React, { useState } from 'react';
import type { Plugin } from '../../types';
import UploadPluginModal from './UploadPluginModal';
import UploadCloudIcon from '../icons/UploadCloudIcon';

interface PluginManagerProps {
    initialPlugins: Plugin[];
}

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => {
    return (
        <button
            onClick={onChange}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 ${
                enabled ? 'bg-yellow-400' : 'bg-gray-600'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};


const PluginManager: React.FC<PluginManagerProps> = ({ initialPlugins }) => {
    const [plugins, setPlugins] = useState<Plugin[]>(initialPlugins);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    const handleTogglePlugin = (pluginId: string) => {
        setPlugins(prevPlugins =>
            prevPlugins.map(plugin =>
                plugin.id === pluginId ? { ...plugin, active: !plugin.active } : plugin
            )
        );
    };

    const handlePluginAdd = (newPlugin: Omit<Plugin, 'id' | 'active'>) => {
        const pluginToAdd: Plugin = {
            id: `new-plugin-${Date.now()}`,
            ...newPlugin,
            active: false,
        };
        setPlugins(prevPlugins => [pluginToAdd, ...prevPlugins]);
        setUploadModalOpen(false);
    };

    return (
        <>
            <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white">Quản lý Plugin</h3>
                        <p className="text-gray-400 mt-1">Mở rộng chức năng của nền tảng bằng cách bật hoặc tắt các mô-đun.</p>
                    </div>
                    <button 
                        onClick={() => setUploadModalOpen(true)}
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2">
                        <UploadCloudIcon className="w-5 h-5" />
                        <span>Thêm Plugin Mới</span>
                    </button>
                </div>
                <div className="divide-y divide-gray-700">
                    {plugins.map(plugin => (
                        <div key={plugin.id} className="p-6 flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <h4 className="font-bold text-white text-lg">{plugin.name}</h4>
                                <p className="text-gray-400 mt-1 text-sm max-w-2xl">{plugin.description}</p>
                                <p className="text-xs text-gray-500 mt-2">Tác giả: <span className="font-medium text-gray-400">{plugin.author}</span></p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex-shrink-0 flex items-center space-x-4">
                                <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${plugin.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                    {plugin.active ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                                </span>
                                <ToggleSwitch enabled={plugin.active} onChange={() => handleTogglePlugin(plugin.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isUploadModalOpen && (
                <UploadPluginModal 
                    onClose={() => setUploadModalOpen(false)}
                    onPluginAdd={handlePluginAdd}
                />
            )}
        </>
    );
};

export default PluginManager;
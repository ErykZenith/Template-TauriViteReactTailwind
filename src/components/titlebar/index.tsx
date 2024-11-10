import { getCurrentWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';

const appWindow = getCurrentWindow();

export const Titlebar = () => {
  const [isMaximizable, setIsMaximizable] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const updateIsMaximizable = async () => setIsMaximizable(await appWindow.isMaximized());

  useEffect(() => {
    updateIsMaximizable();
    const events = ['resize', 'maximize', 'unmaximize'];
    const unlisteners = events.map(event =>
      listen(`tauri://${event}`, updateIsMaximizable)
    );
    return () => unlisteners.forEach(u => u.then(unlisten => unlisten()));
  }, []);

  const controls = [
    {
      id: 'minimize',
      action: () => {
        setHoveredButton(null);
        appWindow.minimize();
      },
      icon: <line x1="19" y1="12.5" x2="6" y2="12.5" stroke="#cecece" />,
      hover: 'bg-gray-600 bg-opacity-30'
    },
    {
      id: 'maximize',
      action: async () => {
        await appWindow.toggleMaximize();
        setHoveredButton(null);
        updateIsMaximizable();
      },
      icon: isMaximizable ? (
        <><rect x="6.5" y="8.5" width="9" height="9" stroke="#cecece" />
          <path d="M9 7H17V15H16V16H17H18V15V7V6H17H9H8V7V8H9V7Z" fill="#cecece" /></>
      ) : (
        <rect x="7.5" y="7.5" width="9" height="9" stroke="#cecece" />
      ),
      hover: 'bg-gray-600 bg-opacity-30'
    },
    {
      id: 'close',
      action: () => {
        setHoveredButton(null);
        appWindow.close();
      },
      icon: <path d="M18 6L6.34343 17.6566M6 6L17.6566 17.6566" stroke="#cecece" />,
      hover: 'bg-red-600'
    }
  ];

  return (
    <div className="w-screen h-10 flex flex-row justify-end items-center bg-neutral-900"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
      <div className="h-full flex flex-row items-center"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {controls.map(({ id, action, icon, hover }) => (
          <button
            key={id}
            onClick={action}
            onMouseEnter={() => setHoveredButton(id)}
            onMouseLeave={() => setHoveredButton(null)}
            className={`w-12 h-10 flex items-center justify-center border-none outline-none ${hoveredButton === id ? 'text-white '+hover : ''} transition-colors`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{icon}</svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Titlebar;
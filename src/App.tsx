import { getCurrentWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/core';
import { Titlebar, Main } from './components/'
import { useEffect, useState } from 'react';
import Rust from './assets/images/rust.png';

const appWindow = getCurrentWindow();

const App = (): JSX.Element => {
  const [message, setMessage] = useState<string>('');
  const hi_rust = async () => {
    const message: string = await invoke('hi_rust');
    setMessage(message);
  }
  useEffect(() => {
    (async () => {
      await appWindow.show();
    })();

    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-900">
      <Titlebar />
      <Main>
        <h1 className='text-center'>Welcome to the Tauri, Vite, React and TailwindCSS template</h1>
        <p className='text-center h-5 text-sky-400 font-bold'>{message}</p>
        <img className='w-40' src={Rust}/>
        <button 
        className='bg-yellow-400 hover:bg-yellow-200 text-zinc-900 font-bold py-2 px-4 rounded'
        onClick={hi_rust}
        >
          Hi Rust
        </button>
      </Main>
    </div>
  )
}

export default App
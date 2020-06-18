import dynamic from 'next/dynamic';

export default dynamic(() => import('./TUIViewer'), { ssr: false });

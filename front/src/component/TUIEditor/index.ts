import dynamic from 'next/dynamic';

export default dynamic(() => import('./TUIEditor'), { ssr: false });

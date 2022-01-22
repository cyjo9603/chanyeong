import { FC, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactChild;
}

const MODAL_DIV_ID = 'modal';

const ClientOnlyPortal: FC<Props> = ({ children }) => {
  const modalRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    modalRef.current = document.getElementById(MODAL_DIV_ID);
    setMounted(true);
  }, []);

  return mounted && createPortal(children, modalRef.current);
};

export default ClientOnlyPortal;

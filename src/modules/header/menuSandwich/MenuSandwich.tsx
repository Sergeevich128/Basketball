import React, {useEffect, useRef, useState} from 'react';
import './menuSandwich.css'

const MenuSandwich = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", (event: MouseEvent) => {
      let target: EventTarget | null = event.target;
      if (menuRef.current && !menuRef.current.contains((target as HTMLElement))) {
        setIsMenuOpen(false)
      }
    })
  }, []);

  return (
    <div ref={menuRef} className={"sandwich" + (isMenuOpen ? " open" : "")}>
      <div onClick={() => setIsMenuOpen((setIsMenuOpen) => !setIsMenuOpen)} className="sandwich-icon">
        <span/>
        <span/>
        <span/>
      </div>
      <menu>
        <div className="menu-item">Decimal</div>
        <div className="menu-item">Fractional</div>
        <div className="menu-item">American</div>
        <label className={'quickplay menu-item'}>Quickplay
          <input type="checkbox"/>
        </label>
        <div className="menu-item">Bet History</div>
        <div className="img-menu">
          <svg width="22" height="20" viewBox="0 0 22 20" fill='none'
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M4.88867 8L10.89 1.99867L16.8913 8H16.89V18H4.89001V8H4.88867ZM2.89001 9.99866L1.4132 11.4755L0 10.0623L9.47699 0.58529C10.2574 -0.195097 11.5226 -0.195097 12.303 0.58529L21.78 10.0623L20.3668 11.4755L18.89 9.99869V18C18.89 19.1046 17.9946 20 16.89 20H4.89001C3.78545 20 2.89001 19.1046 2.89001 18V9.99866Z"
                  fill="#595959"/>
          </svg>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11ZM20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM12.0036 12.9983H13.003V14.9983H9.00295V12.9983H10.003V10.9983H9.00295V8.99835H12.0036V12.9983ZM12.0007 6.99835C12.0007 7.55063 11.5528 7.99835 11.0003 7.99835C10.4479 7.99835 10 7.55063 10 6.99835C10 6.44606 10.4479 5.99835 11.0003 5.99835C11.5528 5.99835 12.0007 6.44606 12.0007 6.99835Z"
                  fill="#595959"/>
          </svg>
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7 5.6179L11 3.6179V14.3818L7 12.3818V5.6179ZM5.76393 3.99987L13 0.381836V17.6179L5.76393 13.9999H2C0.89543 13.9999 0 13.1044 0 11.9999V5.99987C0 4.8953 0.89543 3.99987 2 3.99987H5.76393ZM5 5.99987H2V11.9999H5V5.99987ZM18.6791 0.456591C20.7136 2.48062 22 5.56797 22 8.99987C22 12.4318 20.7136 15.5191 18.6791 17.5431L17.1031 16.2824C18.8488 14.6535 20 12.012 20 8.99987C20 5.9877 18.8488 3.34623 17.1031 1.71735L18.6791 0.456591ZM18 8.99987C18 6.5892 17.0649 4.41225 15.5748 2.94007L13.9973 4.20205C15.2072 5.29158 16 7.02554 16 8.99987C16 10.9742 15.2072 12.7082 13.9973 13.7977L15.5748 15.0597C17.0649 13.5875 18 11.4105 18 8.99987Z"
                  fill="#595959"/>
          </svg>
        </div>
      </menu>
    </div>

  );
};

export default MenuSandwich;
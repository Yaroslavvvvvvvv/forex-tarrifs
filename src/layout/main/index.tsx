import { useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-wrapper__content">
        <SwitchTransition mode="out-in">
          <CSSTransition key={location.pathname} nodeRef={nodeRef} classNames="fade" timeout={600}>
            <div ref={nodeRef} className="route-view">
              {outlet}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </main>
      <Footer />
    </div>
  );
}

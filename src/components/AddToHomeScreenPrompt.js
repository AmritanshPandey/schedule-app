import React, { useEffect, useState } from 'react';
import '../styling/addToHome.css';

/**
 * Shows A2HS instructions every page load until the app is installed.
 * - DOES NOT persist dismissal between reloads (so reload -> prompt reappears)
 * - Persists "installed" state so once installed it stops showing forever
 */

const INSTALLED_KEY = 'planr_pwa_installed_v1';

const isMobileUA = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');

function isCurrentlyInstalled() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
  if (window.navigator.standalone) return true; // iOS old
  // fallback: check localStorage (set when appinstalled fires)
  return localStorage.getItem(INSTALLED_KEY) === 'true';
}

export default function AddToHomeScreenPrompt({ breakpoint = 768 }) {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If already installed, do nothing (persisted)
    if (isCurrentlyInstalled()) return;

    // Only show on mobile and below breakpoint
    if (!isMobileUA() || window.innerWidth >= breakpoint) return;

    // Detect iOS Safari (manual instructions)
    const ua = navigator.userAgent || '';
    const iosSafari = /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    setIsIos(!!iosSafari);

    // If installed (display-mode may be true) don't show
    if (isCurrentlyInstalled()) return;

    // Show prompt on load. We deliberately show immediately on each load until installed.
    setVisible(true);

    // Capture beforeinstallprompt for Android/Chrome
    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // keep visible (we always show until installed)
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

    // When the app is installed (Chrome fires this), persist installed = true
    const onAppInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, 'true');
      setVisible(false);
    };
    window.addEventListener('appinstalled', onAppInstalled);

    // Also observe changes to display-mode (some browsers may flip to standalone)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const onDisplayModeChange = (ev) => {
      if (ev.matches) {
        localStorage.setItem(INSTALLED_KEY, 'true');
        setVisible(false);
      }
    };
    if (mediaQuery && mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onDisplayModeChange);
    } else if (mediaQuery && mediaQuery.addListener) {
      mediaQuery.addListener(onDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      if (mediaQuery && mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onDisplayModeChange);
      } else if (mediaQuery && mediaQuery.removeListener) {
        mediaQuery.removeListener(onDisplayModeChange);
      }
    };
  }, [breakpoint]);

  const handleInstall = async () => {
    // Android/Chrome: use deferredPrompt if available
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      // If user installed, appinstalled event should fire; but also set installed if user accepted
      if (choice && choice.outcome === 'accepted') {
        localStorage.setItem(INSTALLED_KEY, 'true');
        setVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS: we can't programatically install. Keep visible until user installs.
      // Optionally hide for this session only:
      setVisible(false);
    }
  };

  const handleHideForSession = () => {
    // Hide only for this page load. Reloading the page will show the prompt again (per requirements).
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="a2hs-overlay" role="dialog" aria-label="Install Planr instructions">
      <div className="a2hs-card">
        <div className="a2hs-header">
          <h3>Install Planr</h3>
          <button className="a2hs-close" onClick={handleHideForSession} aria-label="Close">✕</button>
        </div>

        <div className="a2hs-body">
          <p className="a2hs-lead">Install Planr for the best experience. This notice will show each time until you install the app.</p>

          {deferredPrompt ? (
            <>
              <p>Tap the button below to install the app to your home screen.</p>
              <div className="a2hs-actions">
                <button onClick={handleInstall} className="btn primary">Install</button>
                <button onClick={handleHideForSession} className="btn ghost">Hide (this session)</button>
              </div>
            </>
          ) : isIos ? (
            <>
              <ol className="a2hs-steps">
                <li>Tap the <strong>Share</strong> button in Safari (square with an arrow).</li>
                <li>Choose <strong>"Add to Home Screen"</strong>.</li>
              </ol>
              <p className="hint">This instruction will keep coming back until you install the app.</p>
              <div className="a2hs-actions">
                <button onClick={handleHideForSession} className="btn primary">Got it</button>
              </div>
            </>
          ) : (
            <>
              <p>Your browser may support installing webpages as apps — use the browser menu to "Add to Home Screen".</p>
              <div className="a2hs-actions">
                <button onClick={handleHideForSession} className="btn primary">Okay</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
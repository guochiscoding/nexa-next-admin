'use client';

import { Headphones, Send, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '@/locales';

interface SupportPosition {
  x: number;
  y: number;
}

const supportPositionStorageKey = 'nexa-next-admin:floating-support-position:content';
const defaultPosition: SupportPosition = { x: 24, y: 24 };

export function FloatingSupport() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<SupportPosition>(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const supportRef = useRef<HTMLElement | null>(null);
  const dragStartPointer = useRef(defaultPosition);
  const dragStartPosition = useRef(defaultPosition);

  const serviceMessages = useMemo(() => [t('support.messages.welcome'), t('support.messages.guide')], [t]);
  const getSupportSize = useCallback(() => ({ height: 44, width: 128 }), []);

  const getBoundarySize = useCallback(() => {
    const parent = supportRef.current?.parentElement;
    return { height: parent?.clientHeight ?? window.innerHeight, width: parent?.clientWidth ?? window.innerWidth };
  }, []);

  const clampPosition = useCallback((nextPosition: SupportPosition) => {
    const margin = 16;
    const size = getSupportSize();
    const boundary = getBoundarySize();
    return {
      x: Math.min(Math.max(nextPosition.x, margin), Math.max(margin, boundary.width - size.width - margin)),
      y: Math.min(Math.max(nextPosition.y, margin), Math.max(margin, boundary.height - size.height - margin)),
    };
  }, [getBoundarySize, getSupportSize]);

  const savePosition = useCallback((nextPosition: SupportPosition) => {
    window.localStorage.setItem(supportPositionStorageKey, JSON.stringify(nextPosition));
  }, []);

  useEffect(() => {
    try {
      const cached = JSON.parse(window.localStorage.getItem(supportPositionStorageKey) ?? '{}') as Partial<SupportPosition>;
      if (typeof cached.x === 'number' && typeof cached.y === 'number') {
        setPosition(clampPosition(cached as SupportPosition));
        return;
      }
    } catch {
      // Broken position cache should not block the support entry.
    }

    const boundary = getBoundarySize();
    setPosition(clampPosition({ x: boundary.width - 128 - defaultPosition.x, y: boundary.height - 44 - defaultPosition.y }));
  }, [clampPosition, getBoundarySize]);

  useEffect(() => {
    function handleResize() {
      setPosition((current) => {
        const next = clampPosition(current);
        savePosition(next);
        return next;
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition, savePosition]);

  function toggleSupport() {
    if (dragMoved) {
      setDragMoved(false);
      return;
    }
    setOpen((value) => !value);
  }

  function handleDragStart(event: React.PointerEvent) {
    if (event.button !== 0) return;
    setDragging(true);
    setDragMoved(false);
    dragStartPointer.current = { x: event.clientX, y: event.clientY };
    dragStartPosition.current = position;

    function handleDragMove(pointerEvent: PointerEvent) {
      const distanceX = pointerEvent.clientX - dragStartPointer.current.x;
      const distanceY = pointerEvent.clientY - dragStartPointer.current.y;
      if (Math.abs(distanceX) > 3 || Math.abs(distanceY) > 3) setDragMoved(true);
      setPosition(clampPosition({ x: dragStartPosition.current.x + distanceX, y: dragStartPosition.current.y + distanceY }));
    }

    function handleDragEnd() {
      setDragging(false);
      setPosition((current) => {
        savePosition(current);
        return current;
      });
      window.removeEventListener('pointermove', handleDragMove);
    }

    window.addEventListener('pointermove', handleDragMove);
    window.addEventListener('pointerup', handleDragEnd, { once: true });
  }

  return (
    <section ref={supportRef} className={`floating-support ${dragging ? 'is-dragging' : ''} ${open ? 'is-open' : ''}`} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <button aria-expanded={open} aria-label={t('support.title')} className="support-trigger" type="button" onClick={toggleSupport} onPointerDown={handleDragStart}>
        <Headphones aria-hidden="true" className="support-trigger-icon" />
        <span className="support-trigger-text">{t('support.title')}</span>
      </button>
      {open ? (
        <div aria-label={t('support.title')} className="support-panel" role="dialog">
          <header className="support-panel-header" onPointerDown={handleDragStart}>
            <span className="support-avatar"><Headphones aria-hidden="true" /></span>
            <span className="support-heading"><strong>{t('support.title')}</strong><small>{t('support.subtitle')}</small></span>
            <button aria-label={t('common.close')} className="support-close" type="button" onClick={() => setOpen(false)}><X aria-hidden="true" className="size-4" /></button>
          </header>
          <div className="support-message-list">{serviceMessages.map((item) => <p className="support-message" key={item}>{item}</p>)}</div>
          <div className="support-input-row"><input className="support-input" placeholder={t('support.placeholder')} type="text" value={message} onChange={(event) => setMessage(event.target.value)} /><button aria-label={t('support.send')} className="support-send" type="button"><Send aria-hidden="true" className="size-4" /></button></div>
        </div>
      ) : null}
    </section>
  );
}

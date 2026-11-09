'use client';

import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { LogoMark } from '@/layouts/app/LogoMark';
import { useApp } from '@/context/AppProvider';
import { useI18n } from '@/locales';

function Field({ children, label }: { children: React.ReactNode; label: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-[var(--Font-Black-Gy2)]">{label}{children}</label>;
}

export function LoginView() {
  const { login } = useApp();
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get('username') ?? '').trim();
    const password = String(data.get('password') ?? '');
    if (!username || !password) {
      setErrorMessage(!username ? t('auth.requiredUsername') : t('auth.requiredPassword'));
      return;
    }
    setSubmitting(true);
    setErrorMessage('');
    try {
      await login({ password, rememberMe, username });
      const redirect = searchParams.get('redirect');
      router.replace(redirect?.startsWith('/') && !redirect.startsWith('//') && redirect !== '/login' ? redirect : '/');
    } catch {
      setErrorMessage(t('auth.invalidCredentials'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-view">
      <section className="login-brand-zone" aria-hidden="true">
        <div className="login-brand-lockup"><LogoMark /></div>
        <div className="login-brand-copy"><span className="page-eyebrow">{t('auth.loginKicker')}</span><h1>{t('auth.loginHeroTitle')}</h1><p>{t('auth.loginHeroDescription')}</p></div>
        <div className="login-brand-preview"><div className="metric-row"><span className="preview-line" style={{ width: 140 }} /><span className="preview-line" style={{ width: 72 }} /></div><div className="preview-line" style={{ width: '84%' }} /><div className="preview-line" style={{ width: '66%' }} /><div className="preview-line" style={{ width: '92%' }} /></div>
      </section>
      <section className="login-panel" aria-label={t('auth.loginTitle')}>
        <div className="login-form-shell"><p className="page-eyebrow">{t('auth.loginTitle')}</p><h2 className="page-title">{t('auth.loginSubtitle')}</h2><div className="mt-6 grid gap-3">{errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}<Alert variant="info">{t('auth.demoHint')}</Alert><form className="grid gap-4" onSubmit={(event) => void handleSubmit(event)}><Field label={t('auth.username')}><Input autoComplete="username" name="username" placeholder={t('auth.usernamePlaceholder')} prefix={<User className="size-4" />} /></Field><Field label={t('auth.password')}><Input autoComplete="current-password" name="password" placeholder={t('auth.passwordPlaceholder')} prefix={<Lock className="size-4" />} type="password" /></Field><label className="inline-flex items-center gap-2 text-sm"><Checkbox checked={rememberMe} onCheckedChange={setRememberMe} />{t('auth.rememberMe')}</label><Button className="w-full" colorType="blue" htmlType="submit" loading={submitting} size="large" type="primary">{submitting ? t('auth.submitting') : t('auth.submit')}</Button></form></div></div>
      </section>
    </main>
  );
}

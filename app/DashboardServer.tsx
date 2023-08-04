import { useClientContext, createClientContext } from 'react-server-components';

export const I18nContext = createClientContext();

export function DashboardServer() {
  const { t } = useClientContext(I18nContext);

  // Ініціалізація та налаштування i18next

  return (
    <div>Server Component</div>
  );
}

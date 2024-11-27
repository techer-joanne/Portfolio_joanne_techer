import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="font-medium"
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}
import { useTranslations } from 'next-intl';
import { Mail, Linkedin, Briefcase, Lightbulb, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  // Puxa as traduções que você já configurou no JSON
  const t = useTranslations('about');

  // Insira aqui os seus links reais
  const emailAddress = "feedback@pmtoolkit.app"; 
  const linkedinUrl = "https://www.linkedin.com/in/wesley-rib-oliveira/";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-foreground">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna da Esquerda: Avatar e Contatos */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          
          {/* Container do Avatar Estático */}
          <div className="relative w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-muted">
            <img 
              src="/avatar.jpg" 
              alt="Wesley - Product Owner" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="w-full space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-bold text-foreground">Wesley Oliveira</h2>
            <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
              <Briefcase className="w-4 h-4" />
              {t('role')}
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Button asChild className="w-full flex items-center gap-2">
              <a href={`mailto:${emailAddress}?subject=Contato via PMToolkit`}>
                <Mail className="w-4 h-4" />
                {t('email_button')}
              </a>
            </Button>
            <Button asChild className="w-full flex items-center gap-2">
              {/* Adicionado target="_blank" para abrir em nova aba */}
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
                {t('linkedin_button')}
              </a>
            </Button>
          </div>
        </div>

        {/* Coluna da Direita: Textos (História e Motivação) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('experience_title')}</h3>
              </div>
              {/* Classe text-justify adicionada aqui */}
              <p className="text-muted-foreground leading-relaxed text-justify">
                {t('experience_text')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('motivation_title')}</h3>
              </div>
              {/* Classe text-justify adicionada aqui */}
              <p className="text-muted-foreground leading-relaxed text-justify">
                {t('motivation_text')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-muted/30">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t('contact_title')}</h3>
              </div>
              {/* Classe text-justify adicionada aqui */}
              <p className="text-muted-foreground leading-relaxed text-justify">
                {t('contact_text')}
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
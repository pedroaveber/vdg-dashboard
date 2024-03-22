import VozesDoGigantePng from '@/assets/img/VozesDoGiganteLogoBranco.png'
import VozesDoGiganteApp from '@/assets/img/VDGIcon.png'
import Image from 'next/image'
import { GiSoccerBall } from 'react-icons/gi'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <section className="flex h-screen w-full items-center justify-center gap-8 bg-[url('/img/beira-rio.jpg')] bg-cover bg-center">
        <Image
          src={VozesDoGigantePng}
          alt="Vozes do Gigante"
          width={600}
          height={600}
          className="w-[600px]"
        />

        <div className="h-[250px] w-px bg-white" />

        <Image
          src={VozesDoGiganteApp}
          alt="Vozes do Gigante"
          width={250}
          height={250}
        />
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center bg-white pb-24 pt-16">
        <article className="mx-auto flex w-full max-w-[968px] flex-col text-zinc-800">
          <h1 className="text-center text-[5rem] font-black">VDG APP</h1>

          <p className="mt-4 text-lg">
            Um aplicativo para você ficar por dentro de todas as informações que
            acontecem no Sport Club Internacional.
          </p>

          <p className="mt-1 text-lg">
            E mais, você sendo membro do VDG, terá acesso a informações
            exclusivas e bastidores que ocorrem no dia a dia
          </p>

          <p className="mt-4 text-lg">
            O aplicativo conta com o seguintes tópicos:
          </p>

          <ul className="mt-8 grid grid-cols-1 space-y-4 text-lg">
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Notícias e atualizações diárias</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>
                Informações dos jogos: (escalções, estatísticas e etc...)
              </span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Acesso direto as lives do Youtube</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Informações dos eventos VDG</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Informações dos eventos VDG</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Acesso a todos descontos oferecidos pelos parceiros</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <GiSoccerBall />
              <span>Acesso a todas enquetes feitas no programa</span>
            </li>
          </ul>

          <div className="prose prose-lg mt-12 w-full max-w-none">
            <p>
              <strong>Política de Privacidade e Segurança dos Dados</strong> A
              segurança e privacidade dos seus dados são fundamentais para nós.
              No VDG APP, queremos garantir que todas as informações fornecidas
              por você estejam protegidas e sejam tratadas com a máxima
              confidencialidade.
            </p>
            <p>
              <strong>Compromisso com a Segurança:</strong> Todos os dados
              coletados durante o uso do aplicativo são armazenados de forma
              segura em nossos servidores. Implementamos medidas rigorosas de
              segurança para proteger essas informações contra acesso não
              autorizado, uso indevido, alteração ou divulgação.
            </p>
            <p>
              <strong>Acesso Restrito:</strong> Apenas colaboradores autorizados
              têm acesso aos dados armazenados, e isso é estritamente limitado
              ao necessário para operações específicas relacionadas ao
              funcionamento do aplicativo. Mantemos um controle rigoroso sobre
              as permissões de acesso para garantir que suas informações estejam
              protegidas.
            </p>
            <p>
              <strong>Sem Compartilhamento com Terceiros:</strong> Reiteramos
              que, sob nenhuma circunstância, suas informações pessoais serão
              compartilhadas, vendidas ou fornecidas a terceiros sem o seu
              consentimento expresso. Valorizamos a confiança que você deposita
              em nós e estamos comprometidos em manter a integridade e segurança
              dos seus dados.
            </p>
            <p>
              <strong>Uso Interno Responsável:</strong> Os dados coletados são
              utilizados exclusivamente para melhorar a experiência do usuário,
              personalizar conteúdos, fornecer atualizações relevantes e
              garantir o pleno funcionamento do aplicativo. Qualquer utilização
              adicional será realizada mediante o seu consentimento explícito.
            </p>
          </div>
        </article>
      </section>

      <footer className="w-full border-t border-zinc-300 py-8">
        <div className="mx-auto flex max-w-[968px] items-center justify-between">
          <Link href="/privacy">Política de privacidade</Link>

          <small>&copy; Vozes do Gigante - {new Date().getFullYear()}</small>
        </div>
      </footer>
    </div>
  )
}

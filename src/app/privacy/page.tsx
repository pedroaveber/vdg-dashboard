import Image from 'next/image'

import VozesDoGiganteLogoPng from '@/assets/img/VozesDoGiganteLogo.png'
import { AlertTriangle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <main
      id="privacy-policy"
      className="prose prose-rose mx-auto w-full max-w-[1200px] px-4 py-20 lg:px-0"
    >
      <h1>Política de Privacidade de Dados</h1>

      <div className="flex w-full flex-col items-start gap-8">
        <Image
          src={VozesDoGiganteLogoPng}
          alt="Vozes do Gigante logotipo"
          width={400}
          height={300}
        />

        <div className="flex items-start gap-2 lg:px-4">
          <AlertTriangle className="hidden h-10 w-10 fill-red-400 stroke-white lg:block" />

          <article className="flex-1 lg:border-l lg:pl-6">
            <h3 className="mt-0">IMPORTANTE</h3>

            <p>
              Este documento contém informações estratégicas / confidenciais do{' '}
              <strong>Vozes do Gigante</strong>. Qualquer cópia, distribuição ou
              divulgação não autorizada das informações aqui contidas e uma
              violação das políticas e dos direitos de propriedade da{' '}
              <strong>Vozes do Gigante</strong>. Se impresso, o normativo e
              considerado como &quot;cópia não controlada&quot; e perde sua
              validade.
            </p>
          </article>
        </div>
      </div>

      <div>
        <h3>Sumário</h3>

        <nav>
          <ol>
            <li>
              <a href="#objetivos-3">Objetivos 3</a>
            </li>
            <li>
              <a href="#escopo-3">Escopo 3</a>
            </li>
            <li>
              <a href="#legislacao-e-regulamentacao-aplicavel-3">
                Legislação e Regulamentação Aplicável 3
              </a>
            </li>
            <li>
              <a href="#periodicidade-de-revisao-3">
                Periodicidade de Revisão 3
              </a>
            </li>
            <li>
              <a href="#diretrizes">Diretrizes 4</a>
              <ol>
                <li>
                  <a href="#diretrizes-direitos-do-usuario">
                    Direitos do Usuário 4
                  </a>
                </li>
                <li>
                  <a href="#diretrizes-dever-de-nao-fornecer-dados-de-terceiros">
                    Dever de não Fornecer Dados de Terceiros 5
                  </a>
                </li>
                <li>
                  <a href="#diretrizes-dados-pessoais-e-sensiveis">
                    Dados Pessoais e Sensíveis 5
                  </a>
                  <ol>
                    <li>
                      <a href="#diretrizes-dados-pessoais-e-sensiveis-tipos-de-dados-coletados">
                        Tipos de Dados Coletados 5
                      </a>
                    </li>
                    <li>
                      <a href="#diretrizes-dados-pessoais-e-sensiveis-fundamento-juridico-para-tratamento-de-dados-pessoais">
                        Fundamento Jurídico Para Tratamento de Dados Pessoais 6
                      </a>
                    </li>
                    <li>
                      <a href="#diretrizes-dados-pessoais-e-sensiveis-finalidade-do-tratamento-dos-dados-pessoais">
                        Finalidade do Tratamento dos Dados Pessoais 6
                      </a>
                    </li>
                    <li>
                      <a href="#diretrizes-dados-pessoais-e-sensiveis-prazo-de-conservacao-dos-dados-pessoais">
                        Prazo de Conservação dos Dados Pessoais 6
                      </a>
                    </li>
                  </ol>
                </li>

                <li>
                  <a href="#diretrizes-tratamento-dos-dados-pessoais">
                    Do Tratamento dos Dados Pessoais 7
                  </a>
                  <ol>
                    <li>
                      <a href="#diretrizes-tratamento-dos-dados-pessoais-responsabilidade-pelo-tratamento-dos-dados">
                        Responsabilidades Pelo Tratamento dos Dados (Data
                        Controller) 7
                      </a>
                    </li>
                    <li>
                      <a href="#diretrizes-tratamento-dos-dados-pessoais-responsabilidade-pela-protecao-dos-dados">
                        Responsabilidades Pela Proteção dos Dados (Data
                        Protection Officer) 7
                      </a>
                    </li>
                  </ol>
                </li>

                <li>
                  <a href="#diretrizes-seguranca-no-tratamento-dos-dados-pessoais">
                    Segurança no Tratamento dos Dados Pessoais 7
                  </a>
                </li>
                <li>
                  <a href="#diretrizes-dados-de-navegacao">
                    Dados de Navegação (Cookies) 8
                  </a>
                  <ol>
                    <li>
                      <a href="#diretrizes-dados-de-navegacao-cookies-do-sistema">
                        Cookies do Sistema 8
                      </a>
                    </li>
                    <li>
                      <a href="#diretrizes-dados-de-navegacao-gestao-de-cookies-e-configuracoes-do-navegador">
                        Gestão de Cookies e Configurações do Navegador 8
                      </a>
                    </li>
                  </ol>
                </li>

                <li>
                  <a href="#diretrizes-alteracoes">Alterações 8</a>
                </li>
              </ol>
            </li>

            <li>
              <a href="#comissao-tecnica">Comissão Tecnica 9</a>

              <ol>
                <li>
                  <a href="#omissao-tecnica-produtos">Produtos 9</a>
                </li>
                <li>
                  <a href="#comissao-tecnica-seguranca-de-informacao-e-privacidade">
                    Segurança de Informação e Privacidade 9
                  </a>
                </li>
                <li>
                  <a href="#comissao-tecnica-direcao">Direção 9</a>
                </li>
              </ol>
            </li>

            <li>
              <a href="#anexo-a-controle-de-versoes">
                Anexo A - Controle de Versões 9
              </a>
              <ol>
                <li>
                  <a href="#anexo-a-controle-de-versoes-registro-de-alteracoes">
                    Registro de alterações 9
                  </a>
                </li>
                <li>
                  <a href="#anexo-a-controle-de-versoes-revisao-e-aprovacao">
                    Revisão e aprovação 9
                  </a>
                </li>
              </ol>
            </li>

            <li>
              <a href="#anexo-b-documentos-relacionados">
                Anexo B - Documentos Relacionados 9
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <section id="objetivos-3">
        <h2>1. Objetivos</h2>

        <article>
          <p>
            Este documento estabelece as diretrizes para a proteção de dados
            pessoais dos usuários que acessam os serviços do{' '}
            <strong>
              <strong>Vozes do Gigante</strong>
            </strong>
            . Contém informações a respeito do modo como tratamos, total ou
            parcialmente, de forma automatizada ou não, os dados pessoais dos
            usuários. Seu objetivo e esclarecer os interessados acerca dos tipos
            de dados que são coletados, dos motivos da coleta e da forma como o
            usuário poderá atualizar, gerenciar ou excluir estas informações.
          </p>

          <p>
            Esta Política de Privacidade foi elaborada em conformidade com a Lei
            Federal n. 12.965 de 23 de abril de 2014 (Marco Civil da Internet),
            com a Lei Federal n. 13.709, de 14 de agosto de 2018 (Lei Geral de
            Proteção de Dados Pessoais) e com o Regulamento UE n. 2016/679 de 27
            de abril de 2016 (Regulamento Geral Europeu de Proteção de Dados
            Pessoais - RGDP).
          </p>

          <p>
            Para maior clareza, esta Política e os documentos relacionados
            (Anexo B) usam diversos termos relacionados a Segurança de
            Informação. Esses termos estão documentados no Glossário de Termos,
            Abreviações e Acrônimos.
          </p>
        </article>
      </section>

      <section id="escopo-3">
        <h2>2. Escopo</h2>

        <article>
          <p>
            Este documento e seus componentes relacionados (Anexo B) aplicam-se
            a todo e qualquer usuário com acesso as informações da Vozes do
            Gigante, independentemente de seu vínculo com a Instituição:
            dirigente, colaborador efetivo, estagiário, temporário ou terceiro.
          </p>

          <p>
            Este documento também se aplica a todos ativos de Informação:
            sistemas, servidores, computadores, bases de dados, componentes de
            redes, notebooks e quaisquer dispositivos de armazenamento,
            processamento ou tráfego de informações.
          </p>
        </article>
      </section>

      <section id="legislacao-e-regulamentacao-aplicavel-3">
        <h2>3. Legislação e Regulamentação Aplicável</h2>

        <article>
          <p>
            Este documento, seus padrões relacionados e sua implementação,
            destinam-se a cumprir as leis, regulamentos, diretivas, regras e
            códigos aplicáveis onde a <strong>Vozes do Gigante</strong> opera.
          </p>

          <p>
            Em caso de exigências legais que enderecem mudanças nas Políticas de
            Segurança da Informação e Privacidade de Dados, a liderança de
            tecnologia e Segurança da Empresa devem coordenar o desenvolvimento
            e/ou atualizações nas Políticas e/ou Procedimentos complementares.
          </p>

          <p>
            Os processos relacionados a Segurança de Informação e Privacidade de
            Dados da <strong>Vozes do Gigante</strong> são alinhados a Padrões
            amplamente praticados como ISO/IEC 27001:2022, ISO/IEC 27701:2019 e
            Lei Geral de Proteção de Dados Pessoais (LGPD – Lei n° 13.709, de 14
            de agosto de 2018).
          </p>
          <p>
            Para a solução das controvérsias decorrentes do presente
            instrumento, será aplicado integralmente o Direito brasileiro. Os
            eventuais litígios deverão ser apresentados no foro da comarca em
            que se encontra a sede da <strong>Vozes do Gigante</strong>.
          </p>
        </article>
      </section>

      <section id="periodicidade-de-revisao-3">
        <h2>4. Periodicidade de Revisão</h2>

        <article>
          <p>
            Este documento está sujeito a revisões anuais, que podem acontecer
            em periodicidade menor, caso necessário, em decorrência de
            alterações na regulamentação e/ou legislação aplicável ou, ainda,
            para refletir alterações nos procedimentos internos da Organização.
          </p>
        </article>
      </section>

      <section id="diretrizes">
        <h2>5. Diretrizes</h2>

        <article id="diretrizes-direitos-do-usuario">
          <h4>5.1 Direitos do Usuário</h4>

          <p>
            Os serviços do <strong>Vozes do Gigante</strong> se comprometem a
            cumprir as normas previstas na LGPD, em respeito aos seguintes
            princípios:
          </p>

          <ul>
            <li>
              Os dados pessoais do usuário serão processados de forma lícita,
              leal e transparente (licitude, lealdade e transparência);
            </li>
            <li>
              Os dados pessoais do usuário serão coletados apenas para
              finalidades determinadas, explicitas e legitimas, não podendo ser
              tratados posteriormente de uma forma incompatível com essas
              finalidades (limitação das finalidades);
            </li>
            <li>
              Os dados pessoais do usuário serão coletados de forma adequada,
              pertinente e limitada as necessidades do objetivo para os quais
              eles são processados (minimização dos dados);
            </li>
            <li>
              Os dados pessoais do usuário serão exatos e atualizados sempre que
              necessário, de maneira que os dados inexatos sejam apagados ou
              retificados quando possível (exatidão);
            </li>
            <li>
              Os dados pessoais do usuário serão conservados de uma forma que
              permita a identificação dos titulares dos dados apenas durante o
              período necessário para as finalidades para as quais são tratados
              (limitação da conservação);
            </li>
            <li>
              Os dados pessoais do usuário serão tratados de forma segura,
              protegidos do tratamento não autorizado ou ilícito e contra a sua
              perda, destruição ou danificação acidental, adotando as medidas
              técnicas ou organizativas adequadas (integridade e
              confidencialidade).
            </li>
          </ul>

          <p>
            O usuário do sistema possui os seguintes direitos, conferidos pela
            Lei Geral de Proteção de Dados Pessoais e pelo LGDP:
          </p>
          <ul>
            <li>
              Direito de confirmação e acesso: e o direito do usuário de obter
              do sistema a confirmação de que os dados pessoais que lhe digam
              respeito são ou não objeto de tratamento e, se for esse o caso, o
              direito de acessar os seus dados pessoais;
            </li>
            <li>
              Direito de retificação: e o direito do usuário de obter do
              sistema, sem demora injustificada, a retificação dos dados
              pessoais inexatos que lhe digam respeito;
            </li>
            <li>
              Direito a eliminação dos dados (direito ao esquecimento): e o
              direito do usuário de ter seus dados apagados do sistema;
            </li>
            <li>
              Direito a limitação do tratamento dos dados: e o direito do
              usuário de limitar o tratamento de seus dados pessoais, podendo
              obtê-la quando contesta a exatidão dos dados, quando o tratamento
              for ilícito, quando o sistema não precisar mais dos dados para as
              finalidades propostas e quando tiver se oposto ao tratamento dos
              dados e em caso de tratamento de dados desnecessários;
            </li>
            <li>
              Direito de oposição: e o direito do usuário de, a qualquer
              momento, se opor por motivos relacionados com a sua situação
              particular, ao tratamento dos dados pessoais que lhe digam
              respeito, podendo se opor ainda ao uso de seus dados pessoais para
              definição de perfil de marketing (profliga);
            </li>
            <li>
              Direito de portabilidade dos dados: e o direito do usuário de
              receber os dados pessoais que lhe digam respeito e que tenha
              fornecido ao sistema, num formato estruturado, de uso corrente e
              de leitura automática, e o direito de transmitir esses dados a
              outro sistema;
            </li>
            <li>
              Direito de não ser submetido a decisões automatizadas: e o direito
              do usuário de não ficar sujeito a nenhuma decisão tomada
              exclusivamente com base no tratamento automatizado, incluindo a
              definição de perfis (profliga), que produza efeitos na sua esfera
              jurídica ou que o afete significativamente de forma similar.
            </li>
          </ul>

          <p>
            O usuário poderá exercer os seus direitos por meio de comunicação
            escrita enviada a <strong>Vozes do Gigante</strong> o assunto
            &quot;LGDP&quot;, especificando:
          </p>

          <ul>
            <li>
              Nome completo ou razão social, número do CPF (Cadastro de Pessoas
              Físicas, da Receita Federal do Brasil) ou CNPJ (Cadastro Nacional
              de Pessoa Jurídica, da Receita Federal do Brasil) e endereço de
              e-mail do usuário e, se for o caso, do seu representante;
            </li>
            <li>Direito que deseja exercer junto ao sistema;</li>
            <li>Especificar o Sistema;</li>
            <li>Data do pedido e assinatura do usuário;</li>
            <li>
              Todo documento que possa demonstrar ou justificar o exercício de
              seu direito.
            </li>

            <p>
              O pedido deverá ser enviado ao e-mail:{' '}
              <a href="mailto:vdg@vozesdogigante.com">vdg@vozesdogigante.com</a>
              .
            </p>
            <p>
              O usuário será informado em caso de retificação ou eliminação dos
              seus dados.
            </p>
          </ul>
        </article>

        <article id="diretrizes-dever-de-nao-fornecer-dados-de-terceiros">
          <h4>4.2 Dever de não Fornecer Dados de Terceiros</h4>

          <p>
            Durante a utilização dos serviços da{' '}
            <strong>Vozes do Gigante</strong>, a fim de resguardar e de proteger
            os direitos de terceiros, o usuário do sistema deverá fornecer
            somente seus dados pessoais, e não os de terceiros.
          </p>
        </article>

        <article id="diretrizes-dados-pessoais-e-sensiveis">
          <h4>5.3 Dados Pessoais e Sensíveis</h4>

          <p>
            <strong>Dados Pessoais</strong> - Informação relacionada a pessoa
            física que pode ser usada para sua identificação de forma direta, ou
            seja, a Informação sozinha identifica a pessoa, como por exemplo:
            CPF, RG, nome completo. Ainda, e considerado Informação relacionada
            a pessoa física que pode ser usada para sua identificação de forma
            indireta, em que a combinação de informações pode identificar uma
            pessoa, como por exemplo: endereço associado a aspectos físicos e a
            idade, primeiro nome associado a profissão, local de trabalho e
            idade, entre outros.
          </p>
          <p>
            <strong>Dados Pessoais Sensíveis </strong> - IDado pessoal de pessoa
            física sobre origem racial ou étnica, convicção religiosa, opinião
            Política, filiação a sindicato ou a organização de caráter
            religioso, filosófico ou político, dado referente a saúde ou a vida
            sexual, dado genético ou biométrico que pode gerar discriminação
            contra o titular. Por exemplo: religião, etnia, opção sexual,
            Informação sobre pessoa exposta politicamente, entre outros.
          </p>

          <div id="diretrizes-dados-pessoais-e-sensiveis-tipos-de-dados-coletados">
            <h5>5.3.1. Tipos de Dados Coletados</h5>

            <strong>Dados de Identificação Para Realização de Cadastro</strong>
            <br />
            <p>
              A utilização, pelo usuário, de determinadas funcionalidades do
              sistema dependera de cadastro, sendo que, nestes casos, os
              seguintes dados do usuário serão coletados e armazenados:
            </p>

            <ul>
              <li>Nome</li>
              <li>Endereço de E-mail</li>
              <li>Número de Telefone</li>
              <li>Número de CPF</li>
            </ul>

            <strong>Dados Informados no Formulário de Cadastro</strong>
            <br />
            <p>
              Os dados eventualmente informados pelo usuário que utilizar o
              formulário de contato disponibilizado no sistema, incluindo o teor
              da mensagem enviada, serão coletados e armazenados.
            </p>
            <strong>Registros de Acessos</strong>
            <br />
            <p>
              Em atendimento as disposições do art. 15, caput e parágrafos, da
              Lei Federal n. 12.965/2014 (Marco Civil da Internet), os registros
              de acesso do usuário serão coletados e armazenados por, pelo
              menos, seis meses.
            </p>
            <strong>Dados Sensíveis</strong>
            <br />
            <p>
              Não serão coletados dados sensíveis dos usuários, assim entendidos
              aqueles definidos nos arts. 9º e 10º do RGPD e nos arts. 11º e
              seguintes da Lei de Proteção de Dados Pessoais. Assim, dentre
              outros, não haverá coleta dos seguintes dados:
            </p>

            <ul>
              <li>
                Dados que revelem a origem racial ou étnica, as opiniões
                Políticas, as convicções religiosas ou filosóficas, ou a
                filiação sindical do usuário;
              </li>
              <li>Dados genéticos;</li>
              <li>
                Dados biométricos para identificar uma pessoa de forma
                inequívoca;
              </li>
              <li>Dados relativos à saúde do usuário;</li>
              <li>
                Dados relativos à vida sexual ou a orientação sexual do usuário;
              </li>
              <li>
                Dados relacionados a condenações penais ou a infrações ou com
                medidas de Segurança conexas.
              </li>
            </ul>
          </div>

          <div id="diretrizes-dados-pessoais-e-sensiveis-fundamento-juridico-para-tratamento-de-dados-pessoais">
            <h5>
              5.3.2. Fundamento Jurídico Para Tratamento de Dados Pessoais
            </h5>

            <p>
              Ao utilizar os serviços do sistema, o usuário está consentindo com
              a presente Política de Privacidade.
            </p>

            <p>
              O usuário tem o direito de retirar seu consentimento a qualquer
              momento, não comprometendo a licitude do tratamento de seus dados
              pessoais antes da retirada. A retirada do consentimento poderá ser
              feita pelo e-mail:{' '}
              <a href="mailto:vdg@vozesdogigante.com">vdg@vozesdogigante.com</a>
            </p>

            <p>
              O consentimento dos relativamente ou absolutamente incapazes,
              especialmente de crianças menores de 16 (dezesseis) anos, apenas
              poderá ser feito, respectivamente, se devidamente assistidos ou
              representados.
            </p>
            <p>
              Poderão ainda ser coletados dados pessoais necessários para a
              execução e cumprimento dos serviços contratados pelo usuário no
              sistema.
            </p>
            <p>
              O tratamento de dados pessoais sem o consentimento do usuário
              apenas será realizado em razão de interesse legitimo ou para as
              hipóteses previstas em lei, ou seja, dentre outras, as seguintes:
            </p>

            <ul>
              <li>
                Para o cumprimento de obrigação legal ou regulatória pelo
                controlador;
              </li>
              <li>
                Para a realização de estudos por órgão de pesquisa, garantida,
                sempre que possível, a anonimização dos dados pessoais;
              </li>
              <li>
                Quando necessário para a execução de contrato ou de
                procedimentos preliminares relacionados a contrato do qual seja
                parte o usuário, a pedido do titular dos dados;
              </li>
              <li>
                Para o exercício regular de direitos em processo judicial,
                administrativo ou arbitral, esse último nos termos da Lei no
                9.307, de 23 de setembro de 1996 (Lei de Arbitragem);
              </li>
              <li>
                Para a Proteção da vida ou da incolumidade física do titular dos
                dados ou de terceiros;
              </li>
              <li>
                Para a tutela da saúde, em procedimento realizado por
                profissionais da área da saúde ou por entidades sanitárias;
              </li>
              <li>
                Quando necessário para atender aos interesses legítimos do
                controlador ou de terceiros, exceto no caso de prevalecerem
                direitos e liberdades fundamentais do titular dos dados que
                exijam a Proteção dos dados pessoais;
              </li>
              <li>
                Para a Proteção do crédito, inclusive quanto ao disposto na
                legislação pertinente.
              </li>
            </ul>
          </div>

          <div id="diretrizes-dados-pessoais-e-sensiveis-finalidade-do-tratamento-dos-dados-pessoais">
            <h5>5.3.3. Finalidade do Tratamento dos Dados Pessoais</h5>

            <p>
              Os dados pessoais do usuário coletados pelo sistema têm por
              finalidade facilitar, agilizar e cumprir os compromissos
              estabelecidos com o usuário e a fazer cumprir as solicitações
              realizadas.
            </p>

            <p>
              Os dados pessoais poderão ser utilizados também com uma finalidade
              comercial, para personalizar o conteúdo oferecido ao usuário, bem
              como para dar subsídio ao sistema para a melhora da qualidade e
              funcionamento de seus serviços.
            </p>

            <p>
              Os dados de cadastro serão utilizados para permitir o acesso do
              usuário a determinados conteúdos do sistema, exclusivos para
              usuários cadastrados.
            </p>
            <p>
              A coleta de dados relacionados ou necessários a execução de um
              contrato de compra e venda ou de prestação de serviços
              eventualmente firmado com o usuário terá a finalidade de conferir
              as partes Segurança jurídica, além de facilitar e viabilizar a
              conclusão do negócio.
            </p>
            <p>
              O tratamento de dados pessoais para finalidades não previstas
              nesta Política de Privacidade somente ocorrera mediante
              comunicação previa ao usuário, sendo que, em qualquer caso, os
              direitos e obrigações aqui previstos permanecerão aplicáveis.
            </p>
          </div>

          <div id="diretrizes-dados-pessoais-e-sensiveis-prazo-de-conservacao-dos-dados-pessoais">
            <h5>5.3.4. Prazo de Conservação dos Dados Pessoais</h5>

            <p>
              Os dados pessoais do usuário serão conservados pelo prazo máximo
              de: 5 anos, exceto se o usuário solicitar a sua supressão antes do
              final deste prazo.
            </p>

            <p>
              Os dados pessoais dos usuários apenas poderão ser conservados após
              o término de seu tratamento nas seguintes hipóteses:
            </p>

            <ul>
              <li>
                Para o cumprimento de obrigação legal ou regulatória pelo
                controlador;
              </li>
              <li>
                Para estudo por órgão de pesquisa, garantida, sempre que
                possível, a anonimização dos dados pessoais;
              </li>
              <li>
                Para a transferência a terceiro, desde que respeitados os
                requisitos de tratamento de dados dispostos na legislação;
              </li>
              <li>
                Para uso exclusivo do controlador, vedado seu acesso por
                terceiro, e desde que anonimizados os dados.
              </li>
            </ul>
          </div>
        </article>

        <article id="diretrizes-tratamento-dos-dados-pessoais">
          <h4>5.4 Do Tratamento dos Dados Pessoais</h4>

          <div id="diretrizes-tratamento-dos-dados-pessoais-responsabilidade-pelo-tratamento-dos-dados">
            <h5>
              5.4.1. Responsabilidades Pelo Tratamento dos Dados (Data
              Controller)
            </h5>

            <p>
              O controlador, responsável pelo tratamento dos dados pessoais do
              usuário, e a pessoa física ou jurídica, a autoridade pública, a
              agência ou outro organismo que, individualmente ou em conjunto com
              outras, determina as finalidades e os meios de tratamento de dados
              pessoais.
            </p>

            <p>
              O responsável pelo tratamento dos dados pessoais coletados e da
              área responsável, representada pela área de Tecnologia da
              Informação, que poderá ser contactado pelo e-mail:
              <a href="mailto:vdg@vozesdogigante.com">vdg@vozesdogigante.com</a>
              .
            </p>

            <p>
              O responsável pelo tratamento dos dados se encarregara diretamente
              do tratamento dos dados pessoais do usuário.
            </p>
          </div>

          <div id="diretrizes-tratamento-dos-dados-pessoais-responsabilidade-pela-protecao-dos-dados">
            <h5>
              5.4.2. Responsabilidades Pela Proteção dos Dados (Data Protection
              Officer)
            </h5>

            <p>
              O encarregado de Proteção de dados (Data Protection Officer) e o
              profissional encarregado de informar, aconselhar e controlar o
              responsável pelo tratamento dos dados, bem como os trabalhadores
              que tratem os dados, a respeito das obrigações do sistema nos
              termos do RGDP, da Lei de Proteção de Dados Pessoais e de outras
              disposições de Proteção de dados presentes na legislação nacional
              e internacional, em cooperação com a autoridade de controle
              competente.
            </p>

            <p>
              A responsabilidade pela Proteção de dados (Data Protection
              Officer) e da área de Tecnologia da Informação, que poderá ser
              contactado pelo e-mail:{' '}
              <a href="mailto:vdg@vozesdogigante.com">vdg@vozesdogigante.com</a>
              .
            </p>
          </div>
        </article>

        <article id="diretrizes-seguranca-no-tratamento-dos-dados-pessoais">
          <h4>5.5 Segurança no Tratamento dos Dados Pessoais</h4>

          <p>
            O <strong>Vozes do Gigante</strong> se compromete a aplicar as
            medidas técnicas e organizativas aptas a proteger os dados pessoais
            de acessos não autorizados e de situações de destruição, perda,
            alteração, comunicação ou difusão de tais dados.
          </p>

          <p>
            Para a garantia da Segurança, serão adotadas soluções que levem em
            consideração: as técnicas adequadas; os custos de aplicação; a
            natureza, o âmbito, o contexto e as finalidades do tratamento; e os
            riscos para os direitos e liberdades do usuário.
          </p>

          <p>
            O sistema utiliza certificado SSL (Secure Socket Layer) que garante
            que os dados pessoais se transmitam de forma segura e confidencial,
            de maneira que a transmissão dos dados entre o servidor e o usuário,
            e em retroalimentação, ocorra de maneira totalmente cifrada ou
            encriptada.
          </p>

          <p>
            No entanto, o <strong>Vozes do Gigante</strong> se exime de
            responsabilidade por culpa exclusiva de terceiros, como em caso de
            ataque de hackers ou crackers, ou culpa exclusiva do usuário, como
            no caso em que ele mesmo transfere seus dados a terceiro. O{' '}
            <strong>Vozes do Gigante</strong> se compromete, ainda, a comunicar
            o usuário em prazo adequado caso ocorra algum tipo de violação da
            Segurança de seus dados pessoais que possa lhe causar um alto risco
            para seus direitos e liberdades pessoais.
          </p>

          <p>
            A violação de dados pessoais e uma violação de Segurança que
            provoque, de modo acidental ou ilícito, a destruição, a perda, a
            alteração, a divulgação ou acessos não autorizados a dados pessoais
            transmitidos, conservados ou sujeitos a qualquer outro tipo de
            tratamento.
          </p>

          <p>
            Por fim, o <strong>Vozes do Gigante</strong> se compromete a tratar
            os dados pessoais do usuário com confidencialidade, dentro dos
            limites legais.
          </p>
        </article>

        <article id="diretrizes-dados-de-navegacao">
          <h4>5.6 Dados de Navegação (Cookies)</h4>

          <p>
            Cookies são pequenos arquivos de texto enviados pelo sistema ao
            computador do usuário e que nele ficam armazenados, com informações
            relacionadas a navegação do sistema.
          </p>

          <p>
            Os cookies não permitem que qualquer arquivo ou Informação sejam
            extraídos do disco rígido do usuário, não sendo possível, ainda,
            que, por meio deles, se tenha acesso a informações pessoais que não
            tenham partido do usuário ou da forma como utiliza os recursos do
            sistema.
          </p>

          <p>
            É importante ressaltar que nem todo cookie contém informações que
            permitem a identificação do usuário, sendo que determinados tipos de
            cookies podem ser empregados simplesmente para que o sistema seja
            carregado corretamente ou para que suas funcionalidades funcionem do
            modo esperado.
          </p>

          <p>
            As informações eventualmente armazenadas em cookies que permitam
            identificar um usuário são consideradas dados pessoais. Dessa forma,
            todas as regras previstas nesta Política de Privacidade também lhes
            são aplicáveis.
          </p>

          <div id="diretrizes-dados-de-navegacao-cookies-do-sistema">
            <h5>5.6.1. Cookies do Sistema</h5>

            <p>
              Os cookies do sistema são aqueles enviados ao computador ou
              dispositivo do usuário e administrador exclusivamente pelo
              sistema.
            </p>

            <p>
              As informações coletadas por meio destes cookies são utilizadas
              para melhorar e personalizar a experiencia do usuário, sendo que
              alguns cookies podem, por exemplo, ser utilizados para lembrar as
              preferencias e escolhas do usuário, bem como para o oferecimento
              de conteúdo personalizado.
            </p>
          </div>
          <div id="diretrizes-dados-de-navegacao-gestao-de-cookies-e-configuracoes-do-navegador">
            <h5>5.6.2. Gestão de Cookies e Configurações do Navegador</h5>

            <p>
              O usuário poderá se opor ao registro de cookies pelo sistema,
              bastando que desative esta opção no seu próprio navegador ou
              aparelho.
            </p>

            <p>
              A desativação dos cookies, no entanto, pode afetar a
              disponibilidade de algumas ferramentas e funcionalidades do
              sistema, comprometendo seu correto e esperado funcionamento. Outra
              consequência possível e remoção das preferências do usuário que
              eventualmente tiverem sido salvas, prejudicando sua experiencia.
            </p>
          </div>
        </article>

        <article id="diretrizes-alteracoes">
          <h4>5.7 Alterações</h4>

          <p>
            A Empresa se reserva o direito de modificar, a qualquer momento o
            sistema, as presentes normas, especialmente para adaptá-las as
            evoluções dos serviços da Vozes do Giogante, seja pela
            disponibilização de novas funcionalidades, seja pela supressão ou
            modificação daquelas já existentes.
          </p>

          <p>
            O usuário será explicitamente notificado em caso de alteração desta
            Política.
          </p>

          <p>
            Ao utilizar o serviço após eventuais modificações, o usuário
            demonstra sua concordância com as novas normas. Caso discorde de
            alguma das modificações, deverá pedir, imediatamente, o cancelamento
            de sua conta e apresentar a sua ressalva ao serviço de atendimento,
            se assim o desejar.
          </p>

          <p>
            No entanto, o <strong>Vozes do Gigante</strong> se exime de
            responsabilidade por culpa exclusiva de terceiros, como em caso de
            ataque de hackers ou crackers, ou culpa exclusiva do usuário, como
            no caso em que ele mesmo transfere seus dados a terceiro. O{' '}
            <strong>Vozes do Gigante</strong> se compromete, ainda, a comunicar
            o usuário em prazo adequado caso ocorra algum tipo de violação da
            Segurança de seus dados pessoais que possa lhe causar um alto risco
            para seus direitos e liberdades pessoais.
          </p>

          <p>
            A violação de dados pessoais e uma violação de Segurança que
            provoque, de modo acidental ou ilícito, a destruição, a perda, a
            alteração, a divulgação ou acessos não autorizados a dados pessoais
            transmitidos, conservados ou sujeitos a qualquer outro tipo de
            tratamento.
          </p>

          <p>
            Por fim, o <strong>Vozes do Gigante</strong> se compromete a tratar
            os dados pessoais do usuário com confidencialidade, dentro dos
            limites legais.
          </p>
        </article>
      </section>

      <section id="comissao-tecnica">
        <h2>6. Comissão Técnica</h2>

        <article id="comissao-tecnica-produtos">
          <h4>6.1 Produtos</h4>

          <p>Julio Fleck – Gerente de Produtos fleck.julio@gmail.com</p>
        </article>
        <article id="comissao-tecnica-seguranca-de-informacao-e-privacidade">
          <h4>6.2 Segurança de Informação e Privacidade</h4>

          <p>
            Maurício Kwitko – Especialista{' '}
            <a href="mailto:mauriciokwt@gmail.com">mauriciokwt@gmail.com</a>
          </p>
        </article>
        <article id="comissao-tecnica-direcao">
          <h4>6.3 Direção</h4>

          <p>
            Daniela Kraner – Diretoria{' '}
            <a href="mailto:vdg@vozesdogigante.com">vdg@vozesdogigante.com</a>
          </p>
        </article>
      </section>

      <section id="anexo-a-controle-de-versoes">
        <h2>7. Anexo A- Controle de Versões</h2>

        <article
          className="overflow-x-auto"
          id="anexo-a-controle-de-versoes-registro-de-alteracoes"
        >
          <h4>7.1 Registro de alterações</h4>

          <table className="min-w-[600px]">
            <thead>
              <tr>
                <th>Versão</th>
                <th>Descrição</th>
                <th>Motivo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.0</td>
                <td>Versão inicial</td>
                <td>Versão inicial</td>
                <td>03/01/2024</td>
              </tr>
            </tbody>
          </table>

          <small>Table 1. Registro de alterações.</small>
        </article>

        <article
          className="overflow-x-auto"
          id="anexo-a-controle-de-versoes-revisao-e-aprovacao"
        >
          <h4>7.2 Revisão e aprovação</h4>

          <table className="min-w-[600px]">
            <thead>
              <tr>
                <th rowSpan={2}>Elaboração</th>
                <th colSpan={2}>Análise</th>
                <th colSpan={2}>Aprovações</th>
              </tr>
              <tr>
                <th>Gestor Conteúdo</th>
                <th>Superior Imediato</th>
                <th>1º Aprovador</th>
                <th>2º Aprovador</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Julio Fleck</td>
                <td>Julio Fleck</td>
                <td>Daniela Kraner</td>
                <td>Daniela Kraner</td>
                <td>Lucas Collar</td>
              </tr>
            </tbody>
          </table>

          <small>Table 2. Revisão e aprovação.</small>
        </article>
      </section>

      <section id="anexo-b-documentos-relacionados">
        <h2>8. Anexo B- Documentos Relacionados</h2>

        <ul>
          <li>Política de Segurança de Informação;</li>
          <li>Política de Privacidade;</li>
          <li>Norma de Gestão de Backups;</li>
        </ul>
      </section>

      <section id="privacy" className="mt-20">
        <p>
          (Uso do aplicativo) e transferência para qualquer outro aplicativo de
          informações recebidas das APIs do Google seguirão a{' '}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
          >
            Política de Dados do Usuário dos Serviços da API do Google
          </a>
          , incluindo os requisitos de Uso Limitado.
        </p>
        <p>
          Sua política de privacidade e uso de dados do usuário do Google
          obtidos por meio de Escopos Restritos e Sensíveis devem estar em
          conformidade com a Política de Uso Limitado.
        </p>
        <p>
          Este aplicativo está em conformidade com a Política de Dados do
          Usuário dos Serviços da API do Google.
        </p>
        <p>
          Os aplicativos distribuídos no Google Play estão sujeitos ao{' '}
          <a
            href="https://play.google.com/about/developer-distribution-agreement.html"
            target="_blank"
          >
            Acordo de Distribuição de Desenvolvedores do Google Play
          </a>
          .
        </p>
      </section>
    </main>
  )
}

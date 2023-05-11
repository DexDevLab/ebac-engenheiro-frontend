# EBAC - Profissão: Engenheiro Front-End

## React - do zero ao Pro

### Exercício do Módulo 06

Conforme foi solicitado, deve fazer parte da entrega um arquivo contendo a lista de melhorias identificadas.

No conteúdo do repositório do [Módulo 05](https://github.com/DexDevLab/ebac-engenheiro-frontend/tree/main/src/conteudo/adv-react/modulo05) é possível analisar a estrutura atual do projeto. Os principais pontos de melhoria analisados usando o conceito de componentização seguem abaixo:

- O componente principal da calculadora comporta toda a lógica de processamento das entradas do teclado quando ele deveria se abster a exibir o conteúdo visual da calculadora, como um Componente de Container.

- A lógica que não depende inteiramente da apresentação e renderização do componente poderia estar estruturado em um utilitário do componente, já que constitui da manipulação dos dados recebidos e da alteração de State.

- Os Componentes que compõe a calculadora possuem código repetitivo por não possuir um adequado reaproveitamento de props e valores de State.

<br>

As alterações propostas podem ser vistas neste repositório, a partir do conteúdo do [Módulo 06](https://github.com/DexDevLab/ebac-engenheiro-frontend/tree/main/src/conteudo/adv-react/modulo06), as quais foram listadas:

- Todos os Event Handlers foram transportados para um diretório chamado 'handlers' em 'components/Calculator', com exceção de useEffect (localizado no Componente Container) e a função principal de handling (pois não foi possível transportar o Event como argumento para um handler em outro arquivo juntamente com os States);

- As funções utilitárias que validavam as teclas de entrada na calculadora (para impedir uso de caracteres não-numéricos ou fora de sequências aceitáveis) juntamente com as funções de sanitização (adequação devida de numeral e flutuante dependendo do uso) foram colocadas em um diretório chamado 'validators' em 'components/Calculator';

- O bloco de Componentes renderizados contendo as sequências de botões da calculadora e as funções de 'click' foram transferidos para um Componente próprio, que tratará da exibição correta e interação dos valores imutavelmente, facilitando a modularização e leitura do Componente de Container;

- As funcões responsáveis pela lógica da calculadora - ou seja, não envolve renderização de Componente - foram transferidas para o diretório chamado 'processors' em 'components/Calculator', separados pelo tipo de processamento que utilizam e manipulam: entrada de dados (input), organização do conteúdo digitado anteriormente (memory), resolução de fila de operações (calculation) e execução matemática das operações na fila (operation).

<br>

Conclusão - O Componente responsável pela renderização da página possui apenas a lógica relacionada às interações de State. Toda a parte de processamento e eventos de handling não relacionados exclusivamente ao Componente foram transferidos para os locais indicados acima, consolidando a modularização da lógica de plano de fundo (backend) e facilitando modificações futuras. O Componente renderizado foi melhorado e dividido em um módulo contendo as props e states exclusivamente relacionados aos botões da calculadora.

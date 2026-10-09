# Atlas musculoesquelético — GitHub Pages

Visualizador 3D público, preparado como aplicação web instalável (PWA). Consulte PUBLICAR.md para publicar gratuitamente e instalar no Android.

A pasta **docs** contém o site completo e o código-fonte, sem necessidade de compilação. Os caminhos são relativos e permitem publicar num endereço como `https://UTILIZADOR.github.io/atlas-anatomico/`.

## Funcionalidades

Rotação e ampliação; zoom na região sob o cursor; duplo clique para focar uma estrutura; identificação e seleção; ocultação, isolamento e transparência; pesquisa acima da lista; filtros parciais de profundidade; fichas funcionais em português para uma seleção de músculos e descrições originais do atlas quando disponíveis.

O modo offline guarda localmente aproximadamente 10 MB de recursos. A indicação «Atlas disponível offline neste dispositivo» aparece após o armazenamento completo. Ligações a fontes externas continuam a precisar de Internet. O navegador pode remover os dados armazenados quando falta espaço ou quando o utilizador limpa os dados. A instalação depende do navegador e do dispositivo.

## Limites anatómicos

Protótipo sem validação clínica. A cobertura anatómica, as fichas de funções e a classificação de profundidade não foram integralmente verificadas. O adulto masculino de referência não representa um paciente. As camadas são parciais e relativas à região. Não há animações articulares.

## Créditos e licenças

- BodyParts3D — The Database Center for Life Science — CC BY-SA 2.1 Japan.
- Z-Anatomy — The open source atlas of anatomy — CC BY-SA 4.0: https://github.com/Z-Anatomy/Models-of-human-anatomy
- Exportação glTF: https://github.com/nqwrc/3d-anatomy , commit 8ca3b7421bcfbe88b85859eb1983d5cf79f21749.
- Descrições do atlas: Wikipedia / Z-Anatomy, CC BY-SA 3.0. Termos latinos provenientes da exportação do atlas.
- Interface, fichas de consulta e organização das camadas desta versão: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ . As referências das fichas estão ligadas na interface; os resumos não tiveram revisão clínica.
- Three.js 0.160.1: MIT, https://github.com/mrdoob/three.js/blob/r160/LICENSE .
- Draco: Apache 2.0, https://github.com/google/draco/blob/main/LICENSE .

Mantenha este ficheiro, os créditos na interface e docs/models/License.txt ao redistribuir. Este pacote inclui apenas os sistemas muscular e esquelético; não inclui os modelos de rim ou ouvido interno com licenças não comerciais descritos no ficheiro original.

## Verificações desta entrega

Sintaxe JavaScript, existência de todos os recursos do armazenamento offline, âmbito dos caminhos num subdiretório GitHub Pages e simulação de primeira instalação, leitura offline e limpeza de versões antigas. A publicação, instalação Android e apresentação visual ainda precisam de ser confirmadas no endereço real e no dispositivo.

# Publicar o atlas gratuitamente e instalar no Android

## 1. Extrair o pacote

Extraia Atlas-GitHub-Pages.zip. Dentro encontrará a pasta **docs**, README.md e este guia. A pasta docs já contém o site pronto. Não é necessário instalar Node, Android Studio ou pagar por um domínio.

## 2. Criar o repositório

1. Entre em https://github.com ou crie uma conta gratuita.
2. Clique no botão **+** no topo e escolha **New repository**.
3. Em Repository name escreva **atlas-anatomico** (pode escolher outro nome).
4. Selecione **Public**. O código e os modelos serão públicos.
5. Ative **Add a README file** (ou a opção de criar README).
6. Clique em **Create repository**.

## 3. Enviar os ficheiros

1. Na página do repositório, abra **Add file → Upload files**.
2. Arraste a pasta **docs** completa da pasta extraída, e os ficheiros README.md e PUBLICAR.md, para a área de envio. Não envie o ZIP.
3. Confira que a lista de envio contém **docs/index.html**, **docs/models/muscular.glb**, **docs/models/skeletal.glb**, **docs/sw.js** e as restantes subpastas. Preserve a organização das pastas.
4. Clique em **Commit changes**. Se surgir uma escolha, grave diretamente no ramo **main**.

Importante: index.html deve ficar dentro de docs, não dentro de uma pasta adicional como Atlas-GitHub-Pages/docs. Se o envio de pastas não funcionar no seu navegador, utilize Chrome ou Edge num computador.

O ficheiro oculto docs/.nojekyll acompanha o ZIP. Se não aparecer depois do envio, pode criá-lo em **Add file → Create new file**: escreva `docs/.nojekyll` como nome, deixe uma linha vazia e grave. Evita que o GitHub trate o site como um projeto Jekyll.

## 4. Ativar GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Em **Branch**, escolha **main**; ao lado, escolha **/docs**.
4. Clique em **Save**.
5. Aguarde alguns minutos. Volte a Settings → Pages para encontrar o endereço publicado. Pode acompanhar o resultado no separador **Actions**.

O endereço será semelhante a `https://O-TEU-UTILIZADOR.github.io/atlas-anatomico/`. Utilize exatamente a ligação que o GitHub apresentar, incluindo o nome do repositório. Essa ligação pode ser partilhada com qualquer pessoa, sem conta GitHub e sem instalação.

Use **HTTPS**. Se existir uma opção Enforce HTTPS, deixe-a ativa. O endereço localhost usado anteriormente serve apenas no computador local.

## 5. Confirmar que funciona

1. Abra o endereço público com Internet e espere que o esqueleto e a musculatura apareçam.
2. Teste rotação, pesquisa, seleção, foco por duplo clique, camadas e isolamento.
3. Aguarde a indicação **Atlas disponível offline neste dispositivo** no topo. Não feche a página enquanto os recursos estão a ser guardados.
4. Ative o modo avião e recarregue a página ou abra a aplicação instalada. O atlas deve continuar disponível. As páginas externas de referência não funcionam offline.
5. Repita os testes no telemóvel. A visualização exige um navegador com suporte WebGL e aceleração gráfica.

## 6. Instalar no Android

1. Abra a ligação pública no **Chrome**, fora do navegador integrado de WhatsApp ou de outra aplicação.
2. Quando aparecer, toque em **Instalar aplicação** no atlas.
3. Se o botão não aparecer, abra o menu **⋮** do Chrome e procure **Instalar aplicação** ou **Adicionar ao ecrã principal**; o nome varia com a versão do navegador.
4. Confirme a instalação. Ficará um ícone **Atlas 3D** no ecrã inicial.
5. Abra-o uma vez com Internet e espere pela indicação de disponibilidade offline.

A aplicação web não requer um APK nem publicação na Google Play. Em alguns navegadores a opção cria apenas um atalho. O modo offline funciona apenas no dispositivo/navegador que guardou os recursos e pode perder-se se limpar os dados ou se o navegador recuperar espaço.

No telemóvel: um dedo roda; dois dedos ampliam e deslocam. Selecione uma estrutura e toque em **Focar região** para centrar essa zona.

## 7. Atualizar o atlas

1. Substitua no repositório os ficheiros alterados dentro de docs, mantendo os caminhos.
2. Abra **docs/sw.js** e incremente **VERSION** de `'v1'` para `'v2'`, depois `'v3'`, etc., em cada nova publicação. Isto renova todos os recursos guardados offline.
3. Grave as alterações e espere que GitHub Pages termine a publicação.
4. Os visitantes devem abrir ou reabrir o atlas com Internet. Depois de a nova versão ser detetada e guardada, aparece **Atualizar aplicação**; ao tocar, a aplicação recarrega com a versão nova.

Não altere apenas os modelos sem incrementar a versão, pois os dispositivos podem continuar a usar a cópia antiga guardada offline.

## Resolução de problemas

- **404:** confira main + /docs, docs/index.html e a ligação completa publicada. Espere pela conclusão em Actions.
- **Modelo não carrega:** confira as pastas models, draco, data e vendor e os nomes exatos, incluindo maiúsculas/minúsculas. Não abra diretamente index.html a partir do gestor de ficheiros.
- **Não instala:** use HTTPS, Chrome atualizado e o menu ⋮. Aguarde o primeiro carregamento completo. Se já está instalado, o botão pode não aparecer.
- **Não funciona offline:** volte a abrir com Internet, aguarde a indicação de disponibilidade offline e tente novamente. Verifique o espaço livre e evite navegação privada.
- **Aparece versão antiga:** incremente VERSION em docs/sw.js e abra online. Em último caso, limpe os dados do site, sabendo que terá de descarregar novamente os modelos.

## Referências oficiais

- Publicação a partir de um ramo: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Criar o site: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Instalação PWA: https://web.dev/learn/pwa/installation

Este atlas continua a ser um protótipo sem validação clínica. Publicá-lo ou instalá-lo não altera as limitações anatómicas descritas no README e na interface.

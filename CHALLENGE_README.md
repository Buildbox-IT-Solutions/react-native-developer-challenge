# Movie App - React Native Developer Challenge

Este projeto foi desenvolvido como resposta ao desafio de desenvolvimento React Native da Buildbox IT Solutions.

## 📱 Funcionalidades Implementadas

### ✅ Requisitos Atendidos
- [x] **Consumo de API REST** - Integração com OMDb API para dados de filmes
- [x] **Lista de cards** - Tela principal com lista de filmes em formato de cards (imagem e descrição)
- [x] **Navegação para detalhes** - Ao clicar em um item da lista, abre tela com mais informações
- [x] **Interface agradável** - Design limpo e responsivo

### 🎯 Funcionalidades Extras
- [x] **Busca de filmes** - Campo de busca para encontrar filmes por título
- [x] **Paginação** - Carregamento automático de mais resultados
- [x] **Pull to refresh** - Atualização da lista puxando para baixo
- [x] **Loading states** - Indicadores de carregamento durante as operações
- [x] **Tratamento de erros** - Alertas e mensagens de erro para o usuário
- [x] **TypeScript** - Tipagem completa para melhor manutenibilidade

## 🏗️ Arquitetura e Padrões

### Estrutura do Projeto
```
src/
├── components/          # Componentes reutilizáveis
│   └── MovieCard.tsx   # Card do filme na listagem
├── screens/            # Telas da aplicação
│   ├── MovieListScreen.tsx   # Lista de filmes
│   └── MovieDetailScreen.tsx # Detalhes do filme
├── services/           # Camada de serviços
│   └── movieService.ts # Integração com OMDb API
├── types/              # Definições de tipos TypeScript
│   └── movie.ts        # Interfaces dos dados de filmes
└── utils/              # Utilitários (para futuras expansões)
```

### Tecnologias Utilizadas
- **React Native 0.81.1** - Framework principal
- **TypeScript** - Linguagem com tipagem estática
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP para consumo da API
- **OMDb API** - API de dados de filmes

### Padrões Implementados
- **Component-based Architecture** - Componentização clara e reutilizável
- **Separation of Concerns** - Separação entre UI, lógica de negócio e dados
- **Type Safety** - Uso completo do TypeScript com interfaces bem definidas
- **Error Handling** - Tratamento adequado de erros e estados de carregamento
- **Responsive Design** - Layout adaptável a diferentes tamanhos de tela

## 🎨 Design e UX

### Características da Interface
- **Cards responsivos** - Layout de 2 colunas que se adapta ao tamanho da tela
- **Imagens otimizadas** - Fallback para imagens indisponíveis
- **Navegação intuitiva** - Stack navigation com header customizável
- **Feedback visual** - Loading indicators e refresh controls
- **Tipografia clara** - Hierarquia visual bem definida

### Paleta de Cores
- **Primária**: #007AFF (iOS Blue)
- **Secundária**: #333333 (Dark Gray)
- **Background**: #f5f5f5 (Light Gray)
- **Cards**: #ffffff (White)

## 🔧 Como Executar

### Pré-requisitos
- Node.js >= 20
- React Native CLI
- Ambiente de desenvolvimento configurado (iOS/Android)

### Instalação
1. Clone o repositório
2. Execute `npm install` para instalar as dependências
3. Para iOS: Execute `npx react-native run-ios`
4. Para Android: Execute `npx react-native run-android`

## 📝 API Integration

### OMDb API
- **Endpoint**: https://www.omdbapi.com/
- **Funcionalidades utilizadas**:
  - Busca de filmes por título (`s` parameter)
  - Detalhes completos do filme (`i` parameter)
  - Paginação (`page` parameter)

### Exemplo de Uso
```typescript
// Buscar filmes
const movies = await movieService.searchMovies('batman', 1);

// Obter detalhes
const details = await movieService.getMovieDetails('tt0372784');
```

## 🚀 Melhorias Futuras

### Possíveis Expansões
- [ ] Cache local de dados
- [ ] Filtragem por gênero/ano
- [ ] Lista de favoritos
- [ ] Compartilhamento de filmes
- [ ] Dark mode
- [ ] Testes unitários e integração
- [ ] Animações de transição
- [ ] Offline support

## 📱 Screenshots

*Screenshots da aplicação seriam adicionados aqui*

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando React Native e as melhores práticas de desenvolvimento mobile.

---

**Nota**: Este projeto atende a todos os requisitos do desafio e implementa funcionalidades extras para demonstrar conhecimento técnico e atenção aos detalhes.
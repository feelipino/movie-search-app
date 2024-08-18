const apiKey = '95387326e2250e11d401b2201890d792';

document.getElementById('search-button').addEventListener('click', () => { //1
    const query = document.getElementById('search-input').value;
    searchMovies(query);
});

function searchMovies(query) { //2
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`;

    fetch(url) //3
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
}

function displayMovies(movies) { //4
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie'); 

        movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        `;

        movieElement.addEventListener('click', () => { //5
            getMovieDetails(movie.id);
        });

        moviesContainer.appendChild(movieElement);
    });
}



// Passo 1
// function searchMovies(query): função para buscar filmes com base no input do user
// função chamada searchMovies que recebe um parâmetro query, que será o título do filme que o usuário quer buscar
//   URL BASE: https://api.themoviedb.org/3/: Este é o ponto de entrada para a API TMDb. 
//   /themoviedb.org é o domínio do site do TMDb
//   prefixo api. indica que estamos acessando a interface de programação da API
//   /3/ indica versão da API
//   /search/movie = endpoint da busca por filmes
//   api_key=${apiKey}: chave da API para autenticar a requisição.
//   query=${encodeURIComponent(query)}  encodeURIComponent(query) é usado para garantir que o título seja formatado corretamente na URL.

// Passo 2
//fetch(url): Faz a requisição para a URL da API.
// .then(response => response.json()): Converte a resposta da API para JSON.
// .then(data => { console.log(data); }): Recebe os dados convertidos e os imprime no console para verificação.
// .catch(error => { console.error('Erro ao buscar filmes:', error); }): Captura e exibe erros, caso algo dê errado durante a requisição.

// Passo 3
// document.getElementById('search-button'): Seleciona o botão de busca.
// .addEventListener('click', () => { ... }): Adiciona um evento de clique ao botão, para que, quando o usuário clicar nele, a função seja executada.
// const query = document.getElementById('search-input').value;: Obtém o valor que o usuário digitou no campo de busca.
// searchMovies(query);: Chama a função searchMovies, passando o título do filme que o usuário digitou.

// Passo 4
// displayMovies(movies): Função que recebe um array de filmes e os exibe na página.
// movies.forEach(movie => { ... }): Itera sobre cada filme no array e cria um elemento HTML para exibir seu título e pôster.
// movieContainer.innerHTML = '';: Limpa os resultados antigos antes de exibir os novos.
// document.createElement('div'): Cria um novo elemento <div> para cada filme.
//  movieElement.classList.add('movie'): Adicionamos a classe movie ao div recém-criado. A classe movie pode ser usada no CSS para estilizar esse div de forma específica.
// add exibição da imagem e título do filme
// exibição fornecida pela api da imagem : https://image.tmdb.org/t/p/w200 => w200= largura da imagem em px


//Passo 5
// Adicionamos um ouvinte de evento (event listener) ao div do filme. Esse ouvinte escuta por cliques e, quando o div é clicado, a função getMovieDetails(movie.id) é chamada.
// Serve para o usuário conseguir interagir com o resultado exibido
// moviesContainer.appendChild(movieElement) => sso insere cada filme encontrado no contêiner de filmes, tornando-o visível na página. Sem essa linha, o div criado para cada filme não seria adicionado ao DOM e, portanto, não seria mostrado ao usuário. FUNDAMENTAL.

const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUser(name) {
    try {
        const { data } = await axios(APIURL + name);
        createUserCard(data);
        getRepos(name);
    } catch (err) {
        if (err.response.status === 404) {
            createErrorCard('404! Not Found :(');
        }
    }
}

async function getRepos(name) {
    try {
        const { data } = await axios(APIURL + name + '/repos?sort=created');
        addReposToCard(data);
    } catch (err) {
        createErrorCard('Error! Getting Repos');
    }
}

function createUserCard(user) {
    const cardHTML = `<div class="card">
        <div>
            <img
                src="${user.avatar_url}"
                alt="${user.name}"
                class="avatar"
            />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>folllowers</strong></li>
                <li>${user.following} <strong>following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos">
            </div>
        </div>
    </div>`;

    main.innerHTML = cardHTML;
}

function createErrorCard(message) {
    const cardHTML = `<div class="card">
    <h1>${message}</h1>
    </div>`;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.getElementById('repos');
    repos.slice(0, 10).forEach((repo) => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';
        repoElement.innerHTML = repo.name;
        reposElement.appendChild(repoElement);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    }
});

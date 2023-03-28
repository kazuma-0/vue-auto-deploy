const urlKey = 'qabot.ongdb.url'
const urlValue = 'http://localhost:7474'

const usernameKey = 'qabot.ongdb.username'
const usernameValue = 'ongdb'

const passwordKey = 'qabot.ongdb.password'
const passwordValue = '123456'

//更新缓存
function updateStorage() {
    let httpUrl = document.getElementById('cql-http-text-input').value;
    let username = document.getElementById('cql-http-text-input-un').value;
    let password = document.getElementById('cql-http-text-input-pw').value;
    if (isNull(httpUrl)){
        httpUrl = urlValue
    }
    if (isNull(usernameValue)){
        username = usernameValue
    }
    if (isNull(passwordValue)){
        password = passwordValue
    }
    localStorage.setItem(urlKey, httpUrl);
    localStorage.setItem(usernameKey, username);
    localStorage.setItem(passwordKey, password);
}

function isNull(nmaGrad3phValue) {
    return nmaGrad3phValue === undefined || nmaGrad3phValue === null
}


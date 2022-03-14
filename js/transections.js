const myModal = new bootstrap.Modal("#transections-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transections: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// Add lançamento
document.getElementById("transections-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transections.unshift({
        value: value, type: type, description: description, date: date
    });

    saveDate(data);
    e.target.reset();
    myModal.hide();

    getTransections();

    alert("Lanlamento adicionado com sucesso!!");

});

checkLogged();

// login
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransections();

}

// sair
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransections() {
    const transections = data.transections;
    let transectionshtml = ``;

    if (transections.length) {
        transections.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }

            transectionshtml += `
            <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.tofixed(2)}</td>
            <td>${type}</td>
            <td>${item.description}</td>
            </tr>
            `
        });
    }

    document.getElementById("transections-list").innerHTML = transectionshtml;

}

// salvar login
function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

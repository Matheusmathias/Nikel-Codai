const myModal = new bootstrap.Modal("#transections-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transections: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transections-button").addEventListener("click", function() {
    window.location.href = "transections.html";
})

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
    
    getTotal();
    getCashout();
    getCashin();

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

    getTotal();
    getCashout();
    getCashin();

}

// sair
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

// listagem entrada 
function getCashin() {
    const transections = data.transections;

    const cashin = transections.filter((item) => item.type === "1");

    if (cashin.length) {
        let cashinhtml = ``;
        let limit = 0;

        if (cashin.length > 5) {
            limit = 5;
        } else {
            limit = cashin.length;
        }

        for (let index = 0; index < limit; index++) {
            cashinhtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">${cashin[index].value.tofixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashin[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashin[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashinhtml;

    }

}

// listagem saída 
function getCashout() {
    const transections = data.transections;

    const cashin = transections.filter((item) => item.type === "2");

    if (cashin.length) {
        let cashinhtml = ``;
        let limit = 0;

        if (cashin.length > 5) {
            limit = 5;
        } else {
            limit = cashin.length;
        }

        for (let index = 0; index < limit; index++) {
            cashinhtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">${cashin[index].value.tofixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashin[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashin[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashinhtml;

    }

}

// total
function getTotal() {
    const transections = data.transections;
    let total = 0;
    transections.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

// salvar login
function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}


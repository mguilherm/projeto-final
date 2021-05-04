function menuIcon(x) {
    x.classList.toggle("change");
}

function openNav() {
    document.getElementById("menuOptions").style.width = "100%";
}

function closeNav() {
    document.getElementById("menuOptions").style.width = "0%";
}

qtProduto = 0;
function addProduto(i, add) {
    p = lsProdutos[i];
    p.qt += add;
    if (p.qt < 0) {
        return;
    }
    valorAtual = p.qt * p.valor;
    document.getElementById(
        `parcial-${i}`
    ).innerHTML = `R$ ${valorAtual.toFixed(2)} (x${p.qt})`;
}

lsProdutos = carregarItens();

function carregarProdutos() {
    grupoAtual = "";
    for (i in lsProdutos) {
        p = lsProdutos[i];

        if (grupoAtual != p.grupo) {
            grupoAtual = p.grupo;
            h2 = document.createElement("h2");
            h2.innerHTML = `${p.grupo} <span>${p.categoria}<span>`;
            document.getElementById("conteudo").appendChild(h2);
        }
        var produto = document
            .getElementsByClassName("item-produto")[0]
            .cloneNode(true);

        if (p.cod != "") {
            produto.getElementsByClassName("adicionais")[0].remove();
            produto.getElementsByClassName("cod-produto")[0].innerHTML = p.cod;
        } else {
            produto.getElementsByClassName("produto")[0].remove();
        }
        produto.getElementsByClassName(
            "valor-produto"
        )[0].innerHTML = `R$ ${p.valor.toFixed(2)}`;
        produto.getElementsByClassName("desc-produto")[0].innerHTML =
            p.descricao;
        document.getElementById("conteudo").appendChild(produto);

        var btMais = produto.getElementsByClassName("bt-mais")[0];
        btMais.setAttribute("onclick", `addProduto(${i} , 1)`);

        var btMenos = produto.getElementsByClassName("bt-menos")[0];
        btMenos.setAttribute("onclick", `addProduto(${i} , -1)`);

        produto
            .getElementsByClassName("valor-parcial")[0]
            .setAttribute("id", `parcial-${i}`);
    }
    document
        .getElementsByClassName("item-produto")[0]
        .setAttribute("style", "display: none;");
}

function carregaEvento(acc) {
    for (i = 0; i < acc.length; i++) {
        itemTemp = acc[i];
        itemTemp.addEventListener("click", function () {
            var panel = this.nextElementSibling;
            if (panel.style.display == "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

// *********Abrir e Fechar Modal**************

btSend = document.getElementById("enviar");
btSend.addEventListener("click", function () {
    bodyModal = "";
    total = 0;

    for (i in lsProdutos) {
        p = lsProdutos[i];
        if (p.qt > 0) {
            totalP = Number(p.qt * p.valor).toFixed(2);
            total += Number(totalP);
            bodyModal += `${p.qt}X `;
            p.cod == ""
                ? (bodyModal += `${p.descricao}`)
                : (bodyModal += `COD ${p.cod}`);

            bodyModal += `<br> Preço unitário: R$ ${p.valor.toFixed(
                2
            )} <br> Total do produto: R$ ${totalP}<br><br> `;
        }
    }
    toFooter = document.getElementById("footer-modal");
    if (total == 0) {
        bodyModal = "Escolha ao menos um produto!";
        document.getElementById("personal-informations").style.display = "none";
        toFooter.innerHTML = "";
    } else {
        total = total.toFixed(2);
        pedido = "";
        bodyModal += `---------------------------<br>Total a Pagar = R$ ${total}<br>`;

        document.getElementById("personal-informations").style.display =
            "block";

        toFooter.innerHTML = `<button onclick="finishShop()" class="send-request">CONTINUAR</button>`;
    }
    document.getElementsByClassName("body-modal")[0].innerHTML = bodyModal;

    modal = document.getElementById("modal-send");
    modal.style.display = "block";
});

btClose = document.getElementById("toClose-btn");
btClose.addEventListener("click", function () {
    modal = document.getElementById("modal-send");
    modal.style.display = "none";
});

function finishShop() {
    clientName = document.getElementById("clientName");

    if (clientName.value == "") {
        alert("Informe seu nome!");
    } else {
        clientName = document.getElementById("clientName").value;
        adress = document.getElementById("adress").value;
        pedido = bodyModal;

        pedido =
            `Olá, meu nome é *${clientName.trim()}*, este é meu pedido: <br><br>` +
            pedido;
        pedido +=
            adress != ""
                ? `<br>Meu endereço é *${adress.trim()}*`
                : (pedido += "");
        phone = "+55061983420512";

        pedido = pedido.replaceAll("<br>", "\n");
        pedido = encodeURI(pedido);

        toLink = `https://api.whatsapp.com/send?phone=${phone}&text=${pedido}`;

        window.open(toLink, "_blank");
    }
}

carregarProdutos();
acc = document.getElementsByClassName("adicionais");
carregaEvento(acc);
acc = document.getElementsByClassName("produto");
carregaEvento(acc);

function closePromo() {
    close = document.getElementById("hightlight");
    close.style.display = "none";
}

function openPromo() {
    setTimeout(() => {
        toOpen = document.getElementById("hightlight");
        toOpen.style.display = "block";
    }, 5000);
}

window.onclick = function (e) {
    modal = document.getElementById("modal-send");
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

openPromo();

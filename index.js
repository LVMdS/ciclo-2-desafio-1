const prompt = require('prompt-sync')();
// Função para calcular o valor total da conta com desconto e o valor por pessoa
function calcularConta() {
    // Solicita o número de pessoas na mesa
    let numPessoasStr = prompt("Informe o número de pessoas na mesa: ");
    let numPessoas;
    // Verifica se a entrada é um número válido
    if (!isNaN(numPessoasStr)) {
        numPessoas = parseInt(numPessoasStr);
    } else {
        console.log("Por favor, insira um número válido para o número de pessoas.");
        return; // Sai da função se a entrada não for um número válido
    }

    // Solicita o valor total da conta
    let valorTotalStr = prompt("Informe o valor total da conta: ");
    let valorTotal;
    // Verifica se a entrada é um número válido
    if (!isNaN(valorTotalStr)) {
        valorTotal = parseFloat(valorTotalStr);
    } else {
        console.log("Por favor, insira um valor válido para o valor total da conta.");
        return; // Sai da função se a entrada não for um número válido
    }

    let listaPessoas = [];
    let listaPagamentos = [];
    let listaGorjeta = [];

    // Solicita o nome de cada pessoa, a forma de pagamento e a gorjeta
    for (let i = 0; i < numPessoas; i++) {
        let nome = prompt("Informe o nome da pessoa " + (i + 1) + ": ");
        listaPessoas.push(nome);

        let formaPagamento = prompt("Como " + nome + " irá pagar? (Digite 1 para PIX, 2 para dinheiro, 3 para cartão): ");
        listaPagamentos.push(formaPagamento);

        let querGorjeta = prompt("Você deseja dar gorjeta para " + nome + "? (Digite '1' para sim ou '2' para não): ");
        if (querGorjeta === "1") {
            console.log("Opções de gorjeta: ");
            let opcoesGorjeta = ["R$ 2,50", "R$ 5,00", "R$ 7,50", "R$ 10,00"];
            for (let j = 0; j < opcoesGorjeta.length; j++) {
                console.log((j + 1) + ". " + opcoesGorjeta[j]);
            }
            let opcaoSelecionada = prompt("Selecione uma opção de gorjeta para  (Digite o número da opção): ");
            let valorGorjeta;

            switch (opcaoSelecionada) {
                case "1":
                    valorGorjeta = 2.50;
                    break;
                case "2":
                    valorGorjeta = 5.00;
                    break;
                case "3":
                    valorGorjeta = 7.50;
                    break;
                case "4":
                    valorGorjeta = 10.00;
                    break;
                default:
                    console.log("Opção inválida. Será considerado que não deseja dar gorjeta.");
                    valorGorjeta = 0;
                    break;
            }

            listaGorjeta.push(valorGorjeta);
        } else {
            listaGorjeta.push(0); // Se não quiser gorjeta, adiciona 0 ao array
        }
    }

    let valorDescontado = 0;

    // Calcula o valor que cada pessoa deve pagar e exibe os resultados
    let totalPorPessoa = [];
    for (let i = 0; i < numPessoas; i++) {
        let valorPorPessoa = valorTotal / numPessoas;

        // Aplica o desconto individualmente para cada pessoa que paga por PIX ou dinheiro
        if (listaPagamentos[i] === "1" || listaPagamentos[i] === "2") {
            let descontoIndividual = valorPorPessoa * 0.10;
            valorPorPessoa -= descontoIndividual;
            valorDescontado += descontoIndividual;
        }

        // Adiciona a gorjeta ao valor por pessoa
        valorPorPessoa += listaGorjeta[i];

        totalPorPessoa.push(valorPorPessoa.toFixed(2));
        console.log("Total para " + listaPessoas[i] + ": R$" + valorPorPessoa.toFixed(2) + " (Gorjeta: R$" + listaGorjeta[i].toFixed(2) + ")");
    }

    // Mostra o valor total da conta com desconto, se houve desconto
    let valorTotalComDesconto = valorTotal - valorDescontado;
    console.log("Valor total da conta: R$" + valorTotalComDesconto.toFixed(2));
}

// Chama a função para executar o programa
calcularConta();


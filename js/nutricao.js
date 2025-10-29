// Man Health - Nutrição Page

// Estrutura de dados para refeições
let refeicoesHoje = {
    cafe: [],
    almoco: [],
    jantar: []
};

// Carregar refeições do localStorage
function carregarRefeicoes() {
    const usuario = getUsuarioLogado();
    if (!usuario) return;
    
    const dataHoje = new Date().toDateString();
    const chave = `refeicoes_${usuario.cpf}_${dataHoje}`;
    const dados = localStorage.getItem(chave);
    
    if (dados) {
        refeicoesHoje = JSON.parse(dados);
    }
    
    atualizarInterface();
}

// Salvar refeições no localStorage
function salvarRefeicoes() {
    const usuario = getUsuarioLogado();
    if (!usuario) return;
    
    const dataHoje = new Date().toDateString();
    const chave = `refeicoes_${usuario.cpf}_${dataHoje}`;
    localStorage.setItem(chave, JSON.stringify(refeicoesHoje));
}

// Calcular total de calorias por tipo de refeição
function calcularCaloriasPorTipo(tipo) {
    return refeicoesHoje[tipo].reduce((total, item) => total + item.calorias, 0);
}

// Calcular total de calorias do dia
function calcularCaloriasTotal() {
    return calcularCaloriasPorTipo('cafe') + 
           calcularCaloriasPorTipo('almoco') + 
           calcularCaloriasPorTipo('jantar');
}

// Atualizar interface com os dados
function atualizarInterface() {
    // Atualizar calorias por tipo
    document.getElementById('caloriasCafe').textContent = `${calcularCaloriasPorTipo('cafe')} cal`;
    document.getElementById('caloriasAlmoco').textContent = `${calcularCaloriasPorTipo('almoco')} cal`;
    document.getElementById('caloriasJantar').textContent = `${calcularCaloriasPorTipo('jantar')} cal`;
    
    // Atualizar total de calorias
    const totalCalorias = calcularCaloriasTotal();
    const metaCalorias = parseInt(document.getElementById('metaCalorias').textContent);
    
    document.getElementById('caloriasAtuais').textContent = `${totalCalorias} cal`;
    
    // Atualizar barra de progresso
    const percentual = Math.min((totalCalorias / metaCalorias) * 100, 100);
    document.getElementById('calorieBar').style.width = `${percentual}%`;
}

// Abrir modal
function abrirModal() {
    document.getElementById('modalRefeicao').style.display = 'block';
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalRefeicao').style.display = 'none';
    document.getElementById('formRefeicao').reset();
}

// Adicionar evento ao botão de adicionar refeição
document.getElementById('btnAdicionarRefeicao').addEventListener('click', abrirModal);

// Processar formulário de refeição
document.getElementById('formRefeicao').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipoRefeicao').value;
    const nome = document.getElementById('nomeAlimento').value.trim();
    const calorias = parseInt(document.getElementById('caloriasAlimento').value);
    
    if (!tipo || !nome || !calorias) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Adicionar refeição
    refeicoesHoje[tipo].push({
        nome: nome,
        calorias: calorias,
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
    
    salvarRefeicoes();
    atualizarInterface();
    fecharModal();
    
    alert(`${nome} adicionado com sucesso!`);
});

// Adicionar interatividade aos cards de refeição
document.querySelectorAll('.meal-card').forEach(card => {
    card.addEventListener('click', function() {
        const tipo = this.getAttribute('data-meal');
        const refeicoes = refeicoesHoje[tipo];
        
        if (refeicoes.length === 0) {
            alert('Nenhuma refeição registrada ainda. Clique em "ADICIONAR REFEIÇÃO" para começar!');
            return;
        }
        
        let mensagem = `Refeições registradas:\n\n`;
        refeicoes.forEach((ref, index) => {
            mensagem += `${index + 1}. ${ref.nome} - ${ref.calorias} cal (${ref.hora})\n`;
        });
        
        alert(mensagem);
    });
});

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modalRefeicao');
    if (event.target === modal) {
        fecharModal();
    }
}

// Inicializar página
window.addEventListener('load', () => {
    carregarRefeicoes();
});

console.log('Nutrição page Man Health carregada!');


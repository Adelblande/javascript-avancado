var lista = [
      {'desc': 'arroz', 'qtd': '1', 'valor': '15.00'},        
      {'desc': 'feijão', 'qtd': '3', 'valor': '3.50'},        
      {'desc': 'açucar', 'qtd': '2', 'valor': '2.00'},        
      {'desc': 'macarrão', 'qtd': '2', 'valor': '1.50'}    
    ];

function getTotal(lista){
  var total = 0;
  for(var i in lista){
    total += lista[i].valor * lista[i].qtd;
  }
  document.getElementById('spanTotal').innerHTML = formataMoeda(total);
}

function setLista (lista) {
  var tabela = '<thead><tr><th>Descrição</th><th>Qtd</th><th>Valor</th><th>Ação</th></tr></thead><tbody>';
  for(var i in lista){
    tabela += "<tr><td>" + formataDesc(lista[i].desc) + "</td><td>" + lista[i].qtd + "</td><td>" + formataMoeda(lista[i].valor) + "</td><td><button class='btn btn-primary' onclick=\"setUpdate(" + i + ");\">Editar</button> <button class='btn btn-primary' onclick=\"Deletar(" + i + ");\">Deletar</button> </td></tr>";
  }
  tabela += '</tbody>';
  document.getElementById('tb_lista').innerHTML = tabela;
  getTotal(lista);
  salvarStorage (lista);
}

function formataDesc (descricao) {
  var str = descricao.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function formataMoeda(vlr) {
  var strMoeda = parseFloat(vlr).toFixed(2) + "";
  strMoeda = strMoeda.replace('.', ',');
  return "R$ "+strMoeda;
}

function Incluir() {
  if(!ValidarForm()){
    return;
  }
  var desc = document.getElementById('desc').value;
  var qtd = document.getElementById('qtd').value;
  var valor = document.getElementById('valor').value;
  lista.unshift({'desc':desc, 'qtd':qtd, 'valor':valor});
  setLista(lista);
  limparForm();
}

function setUpdate (indice){
  var obj = lista[indice];
  document.getElementById('desc').value = obj.desc;
  document.getElementById('qtd').value = obj.qtd;
  document.getElementById('valor').value = obj.valor;
  document.getElementById('btnIncluir').style.display = "none";
  document.getElementById('spanBTN').style.display = "inline-block";
  document.getElementById('hidAlterar').value = indice;
}

function limparForm () {
  document.getElementById('divErro').style.display = "none";
  document.getElementById('desc').value = "";
  document.getElementById('qtd').value = "";
  document.getElementById('valor').value = "";
  document.getElementById('btnIncluir').style.display = "inline-block";
  document.getElementById('spanBTN').style.display = "none";
  document.getElementById('hidAlterar').value = "";
}

function Salvar(){
  if(!ValidarForm()){
    return;
  }
  var i = document.getElementById('hidAlterar').value;
  var desc = document.getElementById('desc').value;
  var qtd = document.getElementById('qtd').value;
  var valor = document.getElementById('valor').value;
  lista[i] = {'desc':desc, 'qtd':qtd, 'valor':valor};
  limparForm();
  setLista(lista);
}

function Deletar (id) {
  if(confirm("Deseja deletar o Item?")){
    if(id === lista.length - 1){
      lista.pop();
    }else if(id === 0){
      lista.shift();
    }else{
      var lista1 = lista.slice(0, id);
      var lista2 = lista.slice(id + 1);
      lista = lista1.concat(lista2);
    }
    setLista(lista);
  }
}

function ValidarForm () {
  var desc = document.getElementById('desc').value;
  var qtd = document.getElementById('qtd').value;
  var valor = document.getElementById('valor').value;
  var msgErro = "";
  if(desc == ""){
    msgErro += "<p>Descrição inválida.</p>";
  }
  if(qtd != parseInt(qtd) || qtd == ""){
    msgErro += "<p>Quantidade inválida.</p>";
  }
  if(valor != parseFloat(valor) || valor == ""){
    msgErro += "<p>Valor inválido.</p>";
  }
  if(msgErro != ""){
    document.getElementById('divErro').style.display = "block";
    document.getElementById('divErro').style.backgroundColor = "#FF0000";
    document.getElementById('divErro').style.color = "#FFFFFF";
    document.getElementById('divErro').style.borderRadius = "15px";
    document.getElementById('divErro').style.margin = "15px";
    document.getElementById('divErro').style.padding = "15px";
    document.getElementById('divErro').innerHTML = "<h5>Erros:</h5>"+msgErro;
    return false;
  }else{
    return true;
  }
}

function ExcluirLista() {
  if(confirm("Apagar Lista?")){
    lista = [];
    setLista(lista);
  }
}

function salvarStorage (lista) {
  var strLista = JSON.stringify(lista);
  localStorage.setItem("strLista", strLista);
}

function carregarLista () {
  var getLista = localStorage.getItem("strLista");
  if(getLista) {
    lista = JSON.parse(getLista);
  }
  setLista(lista);
}
carregarLista ();

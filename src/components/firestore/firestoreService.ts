import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { FormularioRespostas } from "../formulario/FormularioTypes";
import { app, db } from "./firebaseConfig"; // Importando a configuração do Firebase



export const verificarCPFExistente = async (cpf: string, tipo: 'informante' | 'paciente') => {
  const campo = tipo === 'informante' ? 'cpf_informante' : 'cpf_paciente';
  const q = query(collection(db, "pesquisa_cannabis"), where(campo, "==", cpf));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export const salvarDadosNoBanco = async (dadosFormulario: FormularioRespostas) => {
  const dadosParaBanco = {
    nome_informante: dadosFormulario.secao1.nomeInformante,
    cpf_informante: dadosFormulario.secao1.cpfInformante,
    telefone: dadosFormulario.secao1.telefone,
    nome_paciente: dadosFormulario.secao2.nomePaciente,
    cpf_paciente: dadosFormulario.secao2.cpfPaciente,
    data_nascimento: dadosFormulario.secao2.dataNascimento,
    genero: dadosFormulario.secao2.genero,
    raca: dadosFormulario.secao2.raca,
    escolaridade: dadosFormulario.secao2.escolaridade,
    renda: dadosFormulario.secao2.renda,
    associacao: dadosFormulario.secao3.associacao,
    nome_associacao: dadosFormulario.secao3.nomeAssociacao,
    acompanhamento: dadosFormulario.secao3.acompanhamento,
    problemas: dadosFormulario.secao4.problemas,
    cid: dadosFormulario.secao4.cid,
    qualidade_vida_antes: dadosFormulario.secao4.qualidadeVidaAntes,
    satisfacao_saude_antes: dadosFormulario.secao4.satisfacaoSaudeAntes,
    gravidade_sintomas_antes: dadosFormulario.secao4.gravidadeSintomasAntes,
    internacoes_antes: dadosFormulario.secao4.internacoesAntes,
    pronto_atendimento_antes: dadosFormulario.secao4.prontoAtendimentoAntes,
    medicamentos_antes: dadosFormulario.secao4.medicamentosAntes,
    fonte_produto: dadosFormulario.secao5.fonteProduto,
    forma_aquisicao: dadosFormulario.secao5.formaAquisicao,
    tempo_uso: dadosFormulario.secao5.tempoUso,
    caracteristicas_produto: dadosFormulario.secao5.caracteristicasProduto,
    forma_administracao: dadosFormulario.secao5.formaAdministracao,
    efeitos_colaterais: dadosFormulario.secao5.efeitosColaterais,
    tipos_efeitos_colaterais: dadosFormulario.secao5.tiposEfeitosColaterais,
    interrompeu_medicamento: dadosFormulario.secao5.interrompeuMedicamento,
    reduziu_dosagem: dadosFormulario.secao5.reduziuDosagem,
    evolucao_saude: dadosFormulario.secao6.evolucaoSaude,
    evolucao_qualidade_vida: dadosFormulario.secao6.evolucaoQualidadeVida,
    evolucao_queixa_principal: dadosFormulario.secao6.evolucaoQueixaPrincipal,
    evolucao_internacoes: dadosFormulario.secao6.evolucaoInternacoes,
    evolucao_pronto_socorro: dadosFormulario.secao6.evolucaoProntoSocorro,
    observacoes: dadosFormulario.secao6.observacoes,
    created_at: new Date().toISOString(),
  };

  // Remove campos undefined
  const dadosLimpos = Object.fromEntries(
    Object.entries(dadosParaBanco).filter(([_, v]) => v !== undefined)
  );

  await addDoc(collection(db, "pesquisa_cannabis"), dadosLimpos);
};
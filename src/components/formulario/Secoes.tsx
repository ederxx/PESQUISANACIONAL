export const secoes = [
    {
      titulo: "Informações do Informante",
      campos: [
        { tipo: "text", nome: "nomeInformante", label: "Nome do informante *", obrigatorio: true },
        { tipo: "text", nome: "cpfInformante", label: "CPF do informante (sem pontos e traços) *", obrigatorio: true },
        { tipo: "text", nome: "telefone", label: "Telefone com DDD *", obrigatorio: true }
      ]
    },
    {
      titulo: "Informações do Paciente",
      campos: [
        { tipo: "text", nome: "nomePaciente", label: "Nome do paciente *", obrigatorio: true },
        { tipo: "text", nome: "cpfPaciente", label: "CPF do paciente (sem pontos e traços) *", obrigatorio: true },
        { tipo: "date", nome: "dataNascimento", label: "Data de nascimento do paciente *", obrigatorio: true },
        { 
          tipo: "radio", 
          nome: "genero", 
          label: "Em qual das seguintes categorias de gênero você se enquadra? *", 
          opcoes: ["Mulher cisgênero", "Mulher transgênero", "Homem cisgênero", "Homem transgênero", "Travesti", "Não Binário", "Prefiro não responder", "Outra"],
          temOutra: true
        },
        { 
          tipo: "radio", 
          nome: "raca", 
          label: "Em qual das seguintes categorias de raça/cor você se enquadra? *", 
          opcoes: ["Preto(a)", "Pardo(a)", "Branco(a)", "Amarelo(a)", "Indígena", "Prefiro não responder", "Outra"],
          temOutra: true
        },
        { 
          tipo: "radio", 
          nome: "escolaridade", 
          label: "Qual o Nível de Escolaridade do paciente? *", 
          opcoes: ["Educação Infantil", "Ensino Fundamental", "Ensino Médio", "Educação Superior", "Prefiro não responder"]
        },
        { 
          tipo: "radio", 
          nome: "renda", 
          label: "Qual a renda mensal familiar do paciente? *", 
          opcoes: ["Renda até R$ 2.900", "Entre R$ 2.900 e R$ 7.100", "Entre R$ 7.100 e R$ 22.000", "Superior a R$ 22.000", "Prefiro não responder"]
        },
        { 
          tipo: "radio", 
          nome: "associacao", 
          label: "Você (o paciente) está associado(a) a alguma associação ou clínica de Cannabis/Maconha medicinal? *", 
          opcoes: ["Sim", "Não"]
        },
        { tipo: "text", nome: "nomeAssociacao", label: "Se respondeu 'Sim' na pergunta anterior, a qual associação ou clínica você está vinculado(a)?", condicional: "associacao", valorCondicional: "Sim" },
        { 
          tipo: "radio", 
          nome: "acompanhamento", 
          label: "Você (o paciente) está sendo acompanhado no seu tratamento com produto de Cannabis? *", 
          opcoes: ["Sim, por médico", "Sim, por dentista", "Sim, por outro profissional de saúde", "Sim, por terapeuta leigo", "Sim, por outro paciente ou responsável", "Não, não estou sendo acompanhado"]
        }
      ]
    },
    {
      titulo: "Motivação do Tratamento",
      campos: [
        { 
          tipo: "checkbox", 
          nome: "problemas", 
          label: "Assinale o(s) principal(is) problema(s) ou queixa(s) que levou(aram) o paciente a procurar tratamento (máximo 2 opções) *", 
          opcoes: ["Ansiedade", "Artrite reumatoide", "Artrose", "Asma", "Autismo", "AVC", "Bipolaridade", "Câncer", "Compulsão", "Delírios", "Dependência química", "Dermatite crônica", "Depressão", "Distonia", "Doença de Crohn", "Alzheimer", "Parkinson", "Dor Crônica", "Endometriose", "Enxaqueca", "Epilepsia", "ELA", "EM", "Esquizofrenia", "Espasmos", "Estresse pós-traumático", "Fadiga", "Fibromialgia", "Glaucoma", "Hérnia de Disco", "Insônia", "Irritabilidade", "Lesão de medula", "Nevralgia de trigêmeo", "Polineuropatia", "Psoríase", "Retocolite Ulcerativa", "Síndrome do Intestino Irritável", "TDAH", "TPM", "Outra"],
          maxSelecoes: 2,
          temOutra: true
        },
        { tipo: "text", nome: "cid", label: "CID(s) do paciente (se houver):" }
      ]
    },
    {
      titulo: "Avaliação do Estado de Saúde ANTES do Tratamento",
      campos: [
        { 
          tipo: "radio", 
          nome: "qualidadeVidaAntes", 
          label: "Qualidade de vida do paciente, ANTES do tratamento *", 
          opcoes: ["1 (Muito ruim)", "2", "3", "4", "5 (Muito boa)"]
        },
        { 
          tipo: "radio", 
          nome: "satisfacaoSaudeAntes", 
          label: "Satisfação com a saúde do paciente, ANTES do tratamento *", 
          opcoes: ["1 (Muito insatisfeito)", "2", "3", "4", "5 (Muito satisfeito)"]
        },
        { 
          tipo: "radio", 
          nome: "gravidadeSintomasAntes", 
          label: "Gravidade dos sintomas, ANTES do tratamento *", 
          opcoes: ["1 (Muito leve)", "2", "3", "4", "5 (Extrema gravidade)"]
        },
        { tipo: "number", nome: "internacoesAntes", label: "Número de internações nos últimos 6 meses, ANTES do tratamento *" },
        { tipo: "number", nome: "prontoAtendimentoAntes", label: "Número de idas ao pronto atendimento nos últimos 6 meses, ANTES do tratamento *" },
        { 
          tipo: "checkbox", 
          nome: "medicamentosAntes", 
          label: "Medicamentos utilizados antes do tratamento com Cannabis *", 
          opcoes: ["Remédios para dor/inflamação", "Opiáceos", "Corticoides", "Benzodiazepínicos", "Antidepressivos", "Remédios para TDAH", "Antipsicóticos", "Antiepilépticos", "Imunossupressores", "Quimioterápicos", "Outra"],
          temOutra: true
        }
      ]
    },
    {
      titulo: "Características do Tratamento com Cannabis",
      campos: [
        { 
          tipo: "radio", 
          nome: "fonteProduto", 
          label: "Fonte do produto de Cannabis *", 
          opcoes: ["Associação", "Autocultivo", "Produtor autônomo", "Importado", "Farmácia"]
        },
        { 
          tipo: "radio", 
          nome: "formaAquisicao", 
          label: "Forma de aquisição do produto *", 
          opcoes: ["Compra", "Compra subsidiada", "Produção própria", "Fornecimento gratuito"]
        },
        { 
          tipo: "radio", 
          nome: "tempoUso", 
          label: "Tempo de uso do produto *", 
          opcoes: ["Até 4 meses", "5 meses a 1 ano", "1 a 2 anos", "2 a 5 anos", "Mais de 5 anos"]
        },
        { 
          tipo: "radio", 
          nome: "caracteristicasProduto", 
          label: "Características do produto *", 
          opcoes: ["CBD purificado", "Alto CBD", "Meio a meio", "Alto THC", "Nenhum destes", "Não sei"]
        },
        { 
          tipo: "radio", 
          nome: "formaAdministracao", 
          label: "Forma de administração *", 
          opcoes: ["Oral em óleo", "Comestíveis", "Tópica", "Vaporizador", "Fumado", "Outra"],
          temOutra: true
        }
      ]
    },
    {
      titulo: "Efeitos ou Resultados do Tratamento",
      campos: [
        { 
          tipo: "radio", 
          nome: "efeitosColaterais", 
          label: "Percebeu efeitos colaterais? *", 
          opcoes: ["Sim", "Não"]
        },
        { 
          tipo: "checkbox", 
          nome: "tiposEfeitosColaterais", 
          label: "Efeitos colaterais observados:", 
          opcoes: ["Ansiedade", "Aumento de pressão", "Aumento de apetite", "Cansaço", "Diarreia", "Convulsão", "Delírio", "Depressão", "Desmaio", "Enjoo", "Fraqueza", "Insônia", "Letargia", "Boca seca", "Sonolência", "Pânico", "Taquicardia", "Vômito", "Zonzeira", "Outra"],
          condicional: "efeitosColaterais",
          valorCondicional: "Sim",
          temOutra: true
        },
        { 
          tipo: "radio", 
          nome: "interrompeuMedicamento", 
          label: "Interrompeu algum medicamento desde o início do tratamento com Cannabis? *", 
          opcoes: ["Sim", "Não"]
        },
        { 
          tipo: "radio", 
          nome: "reduziuDosagem", 
          label: "Reduziu dosagens de algum medicamento desde o início do tratamento com Cannabis? *", 
          opcoes: ["Sim", "Não"]
        },
        { 
          tipo: "radio", 
          nome: "evolucaoSaude", 
          label: "Evolução da saúde geral do paciente *", 
          opcoes: ["Piora acentuada", "Piora", "Estável", "Melhora", "Melhora acentuada"]
        },
        { 
          tipo: "radio", 
          nome: "evolucaoQualidadeVida", 
          label: "Evolução da qualidade de vida *", 
          opcoes: ["Piora acentuada", "Piora", "Estável", "Melhora", "Melhora acentuada"]
        },
        { 
          tipo: "radio", 
          nome: "evolucaoQueixaPrincipal", 
          label: "Evolução da queixa principal *", 
          opcoes: ["Piora acentuada", "Piora", "Estável", "Melhora", "Melhora acentuada"]
        },
        { 
          tipo: "radio", 
          nome: "evolucaoInternacoes", 
          label: "Evolução da frequência de internações *", 
          opcoes: ["Piora acentuada", "Piora", "Estável", "Melhora", "Melhora acentuada"]
        },
        { 
          tipo: "radio", 
          nome: "evolucaoProntoSocorro", 
          label: "Evolução da frequência de idas ao pronto socorro *", 
          opcoes: ["Piora acentuada", "Piora", "Estável", "Melhora", "Melhora acentuada"]
        },
        { tipo: "textarea", nome: "observacoes", label: "Observações ou informações adicionais:" }
      ]
    }
  ];

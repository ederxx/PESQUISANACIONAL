import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, Trash2, Download, Users } from 'lucide-react';
import * as XLSX from 'xlsx';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from '../components/firestore/firebaseConfig'; // ajuste o caminho conforme sua estrutura

interface Paciente {
  id: string;
  nome_paciente: string;
  cpf_paciente: string;
  data_nascimento: string;
  genero: string;
  raca: string;
  escolaridade: string;
  renda: string;
  created_at: string;
  [key: string]: any;
}

const AdminDashboard = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    carregarPacientes();
    // eslint-disable-next-line
  }, []);

  const carregarPacientes = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "pesquisa_cannabis"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as Paciente[];
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar a lista de pacientes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const deletarPaciente = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.')) {
      return;
    }
    try {
      await deleteDoc(doc(db, "pesquisa_cannabis", id));
      setPacientes(pacientes.filter(p => p.id !== id));
      setIsModalOpen(false);
      setSelectedPaciente(null);
      toast({
        title: "Paciente excluído",
        description: "Os dados do paciente foram removidos com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o paciente.",
        variant: "destructive",
      });
    }
  };

  const exportarParaExcel = (paciente: Paciente) => {
    const dadosParaExcel = {
      'Nome do Informante': paciente.nome_informante,
      'CPF do Informante': paciente.cpf_informante,
      'Telefone': paciente.telefone,
      'Nome do Paciente': paciente.nome_paciente,
      'CPF do Paciente': paciente.cpf_paciente,
      'Data de Nascimento': paciente.data_nascimento,
      'Idade': calcularIdade(paciente.data_nascimento),
      'Gênero': paciente.genero,
      'Raça': paciente.raca,
      'Escolaridade': paciente.escolaridade,
      'Renda': paciente.renda,
      'Associação': paciente.associacao,
      'Nome da Associação': paciente.nome_associacao || 'N/A',
      'Acompanhamento': paciente.acompanhamento,
      'Problemas': Array.isArray(paciente.problemas) ? paciente.problemas.join(', ') : paciente.problemas,
      'CID': paciente.cid || 'N/A',
      'Qualidade de Vida Antes': paciente.qualidade_vida_antes,
      'Satisfação com Saúde Antes': paciente.satisfacao_saude_antes,
      'Gravidade dos Sintomas Antes': paciente.gravidade_sintomas_antes,
      'Internações Antes': paciente.internacoes_antes,
      'Pronto Atendimento Antes': paciente.pronto_atendimento_antes,
      'Medicamentos Antes': Array.isArray(paciente.medicamentos_antes) ? paciente.medicamentos_antes.join(', ') : paciente.medicamentos_antes,
      'Fonte do Produto': paciente.fonte_produto,
      'Forma de Aquisição': paciente.forma_aquisicao,
      'Tempo de Uso': paciente.tempo_uso,
      'Características do Produto': paciente.caracteristicas_produto,
      'Forma de Administração': paciente.forma_administracao,
      'Efeitos Colaterais': paciente.efeitos_colaterais,
      'Tipos de Efeitos Colaterais': Array.isArray(paciente.tipos_efeitos_colaterais) ? paciente.tipos_efeitos_colaterais.join(', ') : paciente.tipos_efeitos_colaterais || 'N/A',
      'Interrompeu Medicamento': paciente.interrompeu_medicamento,
      'Reduziu Dosagem': paciente.reduziu_dosagem,
      'Evolução da Saúde': paciente.evolucao_saude,
      'Evolução da Qualidade de Vida': paciente.evolucao_qualidade_vida,
      'Evolução da Queixa Principal': paciente.evolucao_queixa_principal,
      'Evolução das Internações': paciente.evolucao_internacoes,
      'Evolução do Pronto Socorro': paciente.evolucao_pronto_socorro,
      'Observações': paciente.observacoes || 'N/A',
      'Data de Preenchimento': paciente.created_at
        ? new Date(paciente.created_at).toLocaleDateString('pt-BR')
        : 'N/A'
    };

    const ws = XLSX.utils.json_to_sheet([dadosParaExcel]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados do Paciente');
    const nomeArquivo = `paciente_${paciente.nome_paciente.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);
    toast({
      title: "Arquivo exportado",
      description: "Os dados foram exportados para Excel com sucesso.",
    });
  };

  const exportarTodosParaExcel = () => {
    const dadosParaExcel = pacientes.map(paciente => ({
      'Nome do Informante': paciente.nome_informante,
      'CPF do Informante': paciente.cpf_informante,
      'Telefone': paciente.telefone,
      'Nome do Paciente': paciente.nome_paciente,
      'CPF do Paciente': paciente.cpf_paciente,
      'Data de Nascimento': paciente.data_nascimento,
      'Idade': calcularIdade(paciente.data_nascimento),
      'Gênero': paciente.genero,
      'Raça': paciente.raca,
      'Escolaridade': paciente.escolaridade,
      'Renda': paciente.renda,
      'Associação': paciente.associacao,
      'Nome da Associação': paciente.nome_associacao || 'N/A',
      'Acompanhamento': paciente.acompanhamento,
      'Problemas': Array.isArray(paciente.problemas) ? paciente.problemas.join(', ') : paciente.problemas,
      'CID': paciente.cid || 'N/A',
      'Qualidade de Vida Antes': paciente.qualidade_vida_antes,
      'Satisfação com Saúde Antes': paciente.satisfacao_saude_antes,
      'Gravidade dos Sintomas Antes': paciente.gravidade_sintomas_antes,
      'Internações Antes': paciente.internacoes_antes,
      'Pronto Atendimento Antes': paciente.pronto_atendimento_antes,
      'Medicamentos Antes': Array.isArray(paciente.medicamentos_antes) ? paciente.medicamentos_antes.join(', ') : paciente.medicamentos_antes,
      'Fonte do Produto': paciente.fonte_produto,
      'Forma de Aquisição': paciente.forma_aquisicao,
      'Tempo de Uso': paciente.tempo_uso,
      'Características do Produto': paciente.caracteristicas_produto,
      'Forma de Administração': paciente.forma_administracao,
      'Efeitos Colaterais': paciente.efeitos_colaterais,
      'Tipos de Efeitos Colaterais': Array.isArray(paciente.tipos_efeitos_colaterais) ? paciente.tipos_efeitos_colaterais.join(', ') : paciente.tipos_efeitos_colaterais || 'N/A',
      'Interrompeu Medicamento': paciente.interrompeu_medicamento,
      'Reduziu Dosagem': paciente.reduziu_dosagem,
      'Evolução da Saúde': paciente.evolucao_saude,
      'Evolução da Qualidade de Vida': paciente.evolucao_qualidade_vida,
      'Evolução da Queixa Principal': paciente.evolucao_queixa_principal,
      'Evolução das Internações': paciente.evolucao_internacoes,
      'Evolução do Pronto Socorro': paciente.evolucao_pronto_socorro,
      'Observações': paciente.observacoes || 'N/A',
      'Data de Preenchimento': paciente.created_at
        ? new Date(paciente.created_at).toLocaleDateString('pt-BR')
        : 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(dadosParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Todos os Pacientes');
    const nomeArquivo = `pesquisa_cannabis_completa_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);
    toast({
      title: "Arquivo exportado",
      description: "Todos os dados foram exportados para Excel com sucesso.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-700">
            Dashboard Administrativo
          </h2>
        </div>
        <Button onClick={exportarTodosParaExcel} className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Todos
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Participantes da Pesquisa</CardTitle>
          <p className="text-sm text-gray-600">
            Total de participantes: {pacientes.length}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Gênero</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pacientes.map((paciente) => (
                  <TableRow key={paciente.id}>
                    <TableCell className="font-medium">
                      {paciente.nome_paciente}
                    </TableCell>
                    <TableCell>
                      {calcularIdade(paciente.data_nascimento)} anos
                    </TableCell>
                    <TableCell>{paciente.genero}</TableCell>
                    <TableCell>
                      {paciente.created_at
                        ? new Date(paciente.created_at).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPaciente(paciente)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Detalhes do Paciente: {selectedPaciente?.nome_paciente}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedPaciente && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-semibold text-green-700 mb-2">Informações do Informante</h3>
                                    <p><strong>Nome:</strong> {selectedPaciente.nome_informante}</p>
                                    <p><strong>CPF:</strong> {selectedPaciente.cpf_informante}</p>
                                    <p><strong>Telefone:</strong> {selectedPaciente.telefone}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-green-700 mb-2">Informações do Paciente</h3>
                                    <p><strong>Nome:</strong> {selectedPaciente.nome_paciente}</p>
                                    <p><strong>CPF:</strong> {selectedPaciente.cpf_paciente}</p>
                                    <p><strong>Data de Nascimento:</strong> {selectedPaciente.data_nascimento}</p>
                                    <p><strong>Idade:</strong> {calcularIdade(selectedPaciente.data_nascimento)} anos</p>
                                    <p><strong>Gênero:</strong> {selectedPaciente.genero}</p>
                                    <p><strong>Raça:</strong> {selectedPaciente.raca}</p>
                                    <p><strong>Escolaridade:</strong> {selectedPaciente.escolaridade}</p>
                                    <p><strong>Renda:</strong> {selectedPaciente.renda}</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-green-700 mb-2">Motivação do Tratamento</h3>
                                  <p><strong>Problemas:</strong> {Array.isArray(selectedPaciente.problemas) ? selectedPaciente.problemas.join(', ') : selectedPaciente.problemas}</p>
                                  {selectedPaciente.cid && <p><strong>CID:</strong> {selectedPaciente.cid}</p>}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-green-700 mb-2">Avaliação Antes do Tratamento</h3>
                                  <p><strong>Qualidade de Vida:</strong> {selectedPaciente.qualidade_vida_antes}</p>
                                  <p><strong>Satisfação com Saúde:</strong> {selectedPaciente.satisfacao_saude_antes}</p>
                                  <p><strong>Gravidade dos Sintomas:</strong> {selectedPaciente.gravidade_sintomas_antes}</p>
                                  <p><strong>Internações (6 meses):</strong> {selectedPaciente.internacoes_antes}</p>
                                  <p><strong>Pronto Atendimento (6 meses):</strong> {selectedPaciente.pronto_atendimento_antes}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-green-700 mb-2">Tratamento com Cannabis</h3>
                                  <p><strong>Fonte do Produto:</strong> {selectedPaciente.fonte_produto}</p>
                                  <p><strong>Forma de Aquisição:</strong> {selectedPaciente.forma_aquisicao}</p>
                                  <p><strong>Tempo de Uso:</strong> {selectedPaciente.tempo_uso}</p>
                                  <p><strong>Características:</strong> {selectedPaciente.caracteristicas_produto}</p>
                                  <p><strong>Forma de Administração:</strong> {selectedPaciente.forma_administracao}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-green-700 mb-2">Resultados do Tratamento</h3>
                                  <p><strong>Efeitos Colaterais:</strong> {selectedPaciente.efeitos_colaterais}</p>
                                  <p><strong>Evolução da Saúde:</strong> {selectedPaciente.evolucao_saude}</p>
                                  <p><strong>Evolução da Qualidade de Vida:</strong> {selectedPaciente.evolucao_qualidade_vida}</p>
                                  <p><strong>Evolução da Queixa Principal:</strong> {selectedPaciente.evolucao_queixa_principal}</p>
                                  {selectedPaciente.observacoes && (
                                    <p><strong>Observações:</strong> {selectedPaciente.observacoes}</p>
                                  )}
                                </div>
                                <div className="flex justify-between pt-4 border-t">
                                  <Button
                                    onClick={() => exportarParaExcel(selectedPaciente)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar Excel
                                  </Button>
                                  <Button
                                    onClick={() => deletarPaciente(selectedPaciente.id)}
                                    variant="destructive"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Excluir Paciente
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
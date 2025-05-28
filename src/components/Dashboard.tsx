import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Activity, Award, Home } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firestore/firebaseConfig';

interface DashboardProps {
  respostas: any;
  onVoltarInicio: () => void;
}

const Dashboard = ({ respostas, onVoltarInicio }: DashboardProps) => {
  const [participantes, setParticipantes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "pesquisa_cannabis"));
        const data = snapshot.docs.map(doc => doc.data());
        setParticipantes(data);
      } catch (error) {
        setParticipantes([]);
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, []);

  // Lógica para análises dinâmicas
  const total = participantes.length;

  // Faixas etárias
  const faixas = [
    { faixa: '18-30', min: 18, max: 30 },
    { faixa: '31-45', min: 31, max: 45 },
    { faixa: '46-60', min: 46, max: 60 },
    { faixa: '60+', min: 61, max: 200 }
  ];
  const dadosIdade = faixas.map(faixa => ({
    faixa: faixa.faixa,
    participantes: participantes.filter(p => {
      if (!p.data_nascimento) return false;
      const anoNasc = Number(String(p.data_nascimento).slice(0, 4));
      const idade = new Date().getFullYear() - anoNasc;
      return idade >= faixa.min && idade <= faixa.max;
    }).length
  }));

  // Taxa de melhora (exemplo: evolucao_saude === 'Melhora Significativa' ou 'Melhora Moderada')
  const totalMelhora = participantes.filter(
    p => p.evolucao_saude === 'Melhora Significativa' || p.evolucao_saude === 'Melhora Moderada'
  ).length;
  const taxaMelhora = total ? Math.round((totalMelhora / total) * 100) : 0;

  // Acompanhamento médico (acompanhamento === 'Sim')
  const totalAcompanhamento = participantes.filter(p => p.acompanhamento === 'Sim').length;
  const taxaAcompanhamento = total ? Math.round((totalAcompanhamento / total) * 100) : 0;

  // Satisfação geral (exemplo: satisfacao_saude_antes média)
  const satisfacoes = participantes.map(p => Number(p.satisfacao_saude_antes)).filter(n => !isNaN(n));
  const satisfacaoMedia = satisfacoes.length
    ? (satisfacoes.reduce((a, b) => a + b, 0) / satisfacoes.length).toFixed(1)
    : 'N/A';

  // Produtos mais usados (fonte_produto)
  const produtos = ['Óleo CBD', 'CBD + THC', 'Flores Secas', 'Extratos', 'Outros'];
  const dadosProdutos = produtos.map(produto => ({
    produto,
    uso: participantes.filter(p => (p.fonte_produto || '').toLowerCase().includes(produto.toLowerCase())).length
  }));

  // Pie chart de melhora
  const dadosMelhora = [
    {
      categoria: 'Melhora Significativa',
      valor: participantes.filter(p => p.evolucao_saude === 'Melhora Significativa').length,
      cor: '#16a34a'
    },
    {
      categoria: 'Melhora Moderada',
      valor: participantes.filter(p => p.evolucao_saude === 'Melhora Moderada').length,
      cor: '#65a30d'
    },
    {
      categoria: 'Melhora Leve',
      valor: participantes.filter(p => p.evolucao_saude === 'Melhora Leve').length,
      cor: '#eab308'
    },
    {
      categoria: 'Sem Melhora',
      valor: participantes.filter(p => p.evolucao_saude === 'Sem Melhora').length,
      cor: '#dc2626'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Obrigado pela sua participação!</h1>
          <p className="text-xl text-gray-600">Veja as análises em tempo real da nossa pesquisa</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total de Participantes</p>
                  <p className="text-3xl font-bold">{isLoading ? '...' : total}</p>
                </div>
                <Users className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Taxa de Melhora</p>
                  <p className="text-3xl font-bold">{isLoading ? '...' : `${taxaMelhora}%`}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Acompanhamento Médico</p>
                  <p className="text-3xl font-bold">{isLoading ? '...' : `${taxaAcompanhamento}%`}</p>
                </div>
                <Activity className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Satisfação Geral</p>
                  <p className="text-3xl font-bold">{isLoading ? '...' : satisfacaoMedia}</p>
                </div>
                <Award className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Melhora */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Percentual de Melhora Relatado</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosMelhora}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="valor"
                    label={({ categoria, valor }) => `${categoria}: ${valor}`}
                  >
                    {dadosMelhora.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Produtos Mais Utilizados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosProdutos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produto" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uso" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Faixa Etária */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-700">Participantes por Faixa Etária</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosIdade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="faixa" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="participantes" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Principais */}
        <Card className="mt-8 bg-gradient-to-r from-green-100 to-blue-100">
          <CardHeader>
            <CardTitle className="text-green-700">Principais Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{isLoading ? '...' : `${taxaMelhora}% dos participantes`}</h3>
                <p className="text-gray-600">relataram algum tipo de melhora nos sintomas</p>
              </div>
              <div className="text-center p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Óleo de CBD</h3>
                <p className="text-gray-600">é o produto mais utilizado pelos participantes</p>
              </div>
              <div className="text-center p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{isLoading ? '...' : `${taxaAcompanhamento}% têm`}</h3>
                <p className="text-gray-600">acompanhamento médico regular</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={onVoltarInicio}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Voltar ao Início</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

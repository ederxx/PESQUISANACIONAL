import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { secoes } from './Secoes';    
import { FormularioRespostas } from './FormularioTypes';
import { verificarCPFExistente, salvarDadosNoBanco } from '../firestore/firestoreService';
import { renderCampo } from './FormularioFields';

interface FormularioProps {
  onFinalizar: (respostas: any) => void;
}

const Formulario = ({ onFinalizar }: FormularioProps) => {
  const [secaoAtual, setSecaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<FormularioRespostas>({
    secao1: {},
    secao2: {},
    secao3: {},
    secao4: {},
    secao5: {},
    secao6: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Validação: todos obrigatórios, exceto questão 13 (só se 12 for "Sim")
  const isSecaoValida = () => {
    const campos = secoes[secaoAtual].campos;
    const respostasSecao = respostas[`secao${secaoAtual + 1}`] || {};
    return campos.every((campo: any) => {
      // Questão 13 só é obrigatória se a 12 for "Sim"
      if (campo.nome === "questao13") {
        const valor12 = respostasSecao["questao12"];
        if (valor12 !== "Sim") return true;
      }
      // Para todos os outros campos, verifica se tem valor
      if (campo.obrigatorio === false) return true;
      const valor = respostasSecao[campo.nome];
      if (campo.tipo === "checkbox") {
        return Array.isArray(valor) && valor.length > 0;
      }
      return valor !== undefined && valor !== null && valor !== "";
    });
  };

  const handleInputChange = async (secao: number, campo: string, valor: any) => {
    if ((campo === 'cpfInformante' || campo === 'cpfPaciente') && valor && valor.length === 11) {
      const tipo = campo === 'cpfInformante' ? 'informante' : 'paciente';
      const cpfExiste = await verificarCPFExistente(valor, tipo);
      if (cpfExiste) {
        toast({
          title: "CPF já cadastrado",
          description: `Este CPF já foi utilizado em outra pesquisa. Por favor, verifique os dados.`,
          variant: "destructive",
        });
        return;
      }
    }
    setRespostas(prev => ({
      ...prev,
      [`secao${secao + 1}`]: {
        ...prev[`secao${secao + 1}` as keyof typeof prev],
        [campo]: valor
      }
    }));
  };

  const proximaSecao = () => {
    if (secaoAtual < secoes.length - 1) setSecaoAtual(secaoAtual + 1);
  };

  const secaoAnterior = () => {
    if (secaoAtual > 0) setSecaoAtual(secaoAtual - 1);
  };

  const finalizarFormulario = async () => {
    setIsSubmitting(true);
    try {
      const cpfInformante = respostas.secao1.cpfInformante;
      const cpfPaciente = respostas.secao2.cpfPaciente;

      if (cpfInformante) {
        const cpfInformanteExiste = await verificarCPFExistente(cpfInformante, 'informante');
        if (cpfInformanteExiste) {
          toast({
            title: "CPF do informante já cadastrado",
            description: "Este CPF já foi utilizado em outra pesquisa.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      if (cpfPaciente) {
        const cpfPacienteExiste = await verificarCPFExistente(cpfPaciente, 'paciente');
        if (cpfPacienteExiste) {
          toast({
            title: "CPF do paciente já cadastrado",
            description: "Este CPF já foi utilizado em outra pesquisa.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      await salvarDadosNoBanco(respostas);
      toast({
        title: "Pesquisa enviada com sucesso!",
        description: "Obrigado por participar da nossa pesquisa.",
      });
      onFinalizar(respostas);
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      toast({
        title: "Erro ao enviar pesquisa",
        description: "Ocorreu um erro ao enviar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deveExibirCampo = (campo: any, secaoIndex: number) => {
    if (!campo.condicional) return true;
    const valorCondicional = respostas[`secao${secaoIndex + 1}`]?.[campo.condicional];
    return valorCondicional === campo.valorCondicional;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Enquete Nacional</h1>
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {secoes.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === secaoAtual ? 'bg-green-600' : 
                    index < secaoAtual ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Seção {secaoAtual + 1} de {secoes.length}</p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-700">
              {secoes[secaoAtual].titulo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {secoes[secaoAtual].campos.map(campo =>
              renderCampo(campo, secaoAtual, respostas, handleInputChange, deveExibirCampo)
            )}
            <div className="flex justify-between pt-6">
              <Button
                onClick={secaoAnterior}
                disabled={secaoAtual === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>
              {secaoAtual === secoes.length - 1 ? (
                <Button
                  onClick={finalizarFormulario}
                  disabled={isSubmitting || !isSecaoValida()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? 'Enviando...' : 'Finalizar Enquete'}
                </Button>
              ) : (
                <Button
                  onClick={proximaSecao}
                  disabled={!isSecaoValida()}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Formulario;
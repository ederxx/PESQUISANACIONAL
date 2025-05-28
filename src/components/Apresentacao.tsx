import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


interface ApresentacaoProps {
  onProsseguir: () => void;
}

const Apresentacao = ({ onProsseguir }: ApresentacaoProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-lg sm:text-xl font-bold text-green-700 mb-2">
          Campanha: Pesquisa Cannabis Medicinal
        </h1>
        <h2 className="text-sm sm:text-md font-semibold text-gray-800 mb-4 leading-tight">
          Enquete Nacional sobre o Uso Terapêutico da Cannabis
        </h2>

        <Card className="shadow-lg border border-green-200 rounded-lg">
          <CardContent className="p-3 sm:p-4">
            <div className="max-h-64 sm:max-h-72 overflow-hidden text-sm sm:text-base text-gray-700 leading-relaxed">
              <p className="mb-2">
                O Instituto Terapeutas Cannabicos (ITC) apresenta um formulário eletrônico sobre o uso medicinal de produtos de Cannabis.
              </p>
              <p className="mb-2">
                Ao preencher o formulário, você contribui para a pesquisa, registrando informações sobre o tratamento.
              </p>
              <p className="mb-2">
                A enquete é conduzida por profissionais de saúde, pesquisadores e terapeutas.
              </p>
              <p className="mb-2">
                Os dados fornecidos serão utilizados exclusivamente para qualificação dos tratamentos na rede de terapeutas.
              </p>
              <p className="text-center font-semibold text-green-700">
                Muito obrigado!
              </p>
            </div>

            <div className="text-center mt-4">
              <Button 
                onClick={onProsseguir}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-md shadow-md transition-all duration-200"
              >
                Prosseguir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Apenas um apoio agora */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm font-bold text-gray-600">APOIO:</p>
<img src="https://drive.google.com/file/d/1VmDK9gvm94cELMC9M5PjnwvQX52ra-t9/view?usp=sharing" alt="Logo de apoio" className="mx-auto mt-2 w-20 sm:w-24 h-auto" />


        </div>
      </div>
    </div>
  );
};

export default Apresentacao;

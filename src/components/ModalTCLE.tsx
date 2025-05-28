
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface ModalTCLEProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentimento: (concordou: boolean) => void;
}

const ModalTCLE = ({ isOpen, onClose, onConsentimento }: ModalTCLEProps) => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const handleSubmit = () => {
    if (opcaoSelecionada === 'concordo') {
      onConsentimento(true);
    } else if (opcaoSelecionada === 'nao-concordo') {
      onConsentimento(false);
    }
    setOpcaoSelecionada('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">
            TERMO DE CONSENTIMENTO LIVRE E ELUCIDADO
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              TÍTULO DO ESTUDO: Características do Uso Terapêutico de Produtos de Cannabis no Brasil
            </h3>
            <p className="mb-2"><strong>PESQUISADOR PRINCIPAL:</strong> Dr. Paulo Fleury Teixeira (Médico, PhD)</p>
            <p><strong>PESQUISADORES ENVOLVIDOS:</strong> Paulo Fleury Teixeira, Giovana Graminha, Márcio Alves e Giancarlo Giovanetti Pieracciani</p>
          </div>

          <div>
            <h4 className="font-bold text-green-700 mb-2">OBJETIVO</h4>
            <p>Neste estudo, pretendemos descrever as características das pessoas que usam a cannabis de forma medicinal, dos produtos utilizados, dos resultados gerais e para distúrbios específicos, dos tratamentos com Cannabis na atualidade no Brasil.</p>
          </div>

          <div>
            <h4 className="font-bold text-green-700 mb-2">METODOLOGIA</h4>
            <p>Sua participação no referido estudo se dará através das suas respostas às questões presentes neste formulário eletrônico para preenchimento on-line. Após o registro on-line das respostas ao formulário eletrônico da enquete, será realizada, pelos pesquisadores, a sistematização dos dados coletados, sua posterior análise estatística e divulgação científica e popular.</p>
          </div>

          <div>
            <h4 className="font-bold text-green-700 mb-2">SIGILO E PRIVACIDADE</h4>
            <p>Serão garantidos sigilo e confidencialidade em todas as etapas deste estudo. Seu nome ou qualquer material que identifique a sua pessoa nunca serão divulgados sem que haja a sua solicitação ou permissão. Você não será identificado(a) em nenhuma publicação que possa resultar deste estudo.</p>
          </div>

          <div>
            <h4 className="font-bold text-green-700 mb-2">BENEFÍCIOS, GARANTIAS E RISCOS</h4>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>Para participar deste estudo, você não terá nenhum custo, nem receberá qualquer vantagem financeira. Você será esclarecido(a) sobre o estudo em qualquer aspecto que desejar e estará livre para participar ou recusar-se a participar. Poderá retirar seu consentimento ou interromper a participação a qualquer momento. A sua participação é voluntária e a recusa em participar não acarretará qualquer penalidade ou prejuízo ao seu tratamento. Não será necessário justificar a saída da enquete em qualquer etapa de sua realização. Os resultados da enquete estarão à sua disposição quando finalizada. Os arquivos com os dados coletados serão guardados com os pesquisadores durante cinco anos e, após esse período, serão excluídos.</p>
              
              <p>É assegurada o suporte relacionado à sua participação nesta enquete, durante e após a sua realização, se necessário, bem como é garantido o livre acesso a todas as informações e esclarecimentos adicionais e sobre tudo o que haja interesse em saber a respeito do estudo e suas consequências antes, durante e depois da sua participação nesta enquete.</p>
              
              <p>Ao responder às perguntas, se você sentir-se incomodado (a) ou lesado (a) de alguma forma, um risco possível em responder questionários online sem a presença do pesquisador, ou no caso de você experimentar algum desconforto secundário à sua participação nesta enquete, informe aos pesquisadores para que eles lhe orientem e providenciem o apoio adequado.</p>
              
              <p>Não se prevê ressarcimento de possíveis despesas geradas pela enquete ao participante.</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-bold text-green-700 mb-4">Termo de Consentimento Livre e Elucidado:</h4>
            <p className="mb-4 font-medium">Esta enquete é voltada para pessoas que já fazem uso terapêutico de Cannabis.</p>
            
            <RadioGroup value={opcaoSelecionada} onValueChange={setOpcaoSelecionada}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="concordo" id="concordo" />
                <Label htmlFor="concordo" className="text-lg">Li e concordo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao-concordo" id="nao-concordo" />
                <Label htmlFor="nao-concordo" className="text-lg">Não desejo prosseguir agora</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleSubmit}
            disabled={!opcaoSelecionada}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTCLE;

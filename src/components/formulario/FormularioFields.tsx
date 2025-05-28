import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

export function renderCampo(campo: any, secaoIndex: number, respostas: any, handleInputChange: any, deveExibirCampo: any) {
  if (!deveExibirCampo(campo, secaoIndex)) return null;
  const valor = respostas[`secao${secaoIndex + 1}`]?.[campo.nome] || '';

  switch (campo.tipo) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <div key={campo.nome} className="space-y-2">
          <Label htmlFor={campo.nome} className="text-lg font-medium">{campo.label}</Label>
          <Input
            id={campo.nome}
            type={campo.tipo}
            value={valor}
            onChange={(e) => handleInputChange(secaoIndex, campo.nome, e.target.value)}
            className="w-full"
            required={campo.obrigatorio}
          />
        </div>
      );
    case 'radio':
      return (
        <div key={campo.nome} className="space-y-3">
          <Label className="text-lg font-medium">{campo.label}</Label>
          <RadioGroup
            value={valor}
            onValueChange={(value) => handleInputChange(secaoIndex, campo.nome, value)}
          >
            {campo.opcoes.map((opcao: string) => (
              <div key={opcao} className="flex items-center space-x-2">
                <RadioGroupItem value={opcao} id={`${campo.nome}-${opcao}`} />
                <Label htmlFor={`${campo.nome}-${opcao}`}>{opcao}</Label>
              </div>
            ))}
          </RadioGroup>
          {campo.temOutra && valor === 'Outra' && (
            <Input
              placeholder="Especifique..."
              value={respostas[`secao${secaoIndex + 1}`]?.[`${campo.nome}Outra`] || ''}
              onChange={(e) => handleInputChange(secaoIndex, `${campo.nome}Outra`, e.target.value)}
              className="mt-2"
            />
          )}
        </div>
      );
    case 'checkbox':
      return (
        <div key={campo.nome} className="space-y-3">
          <Label className="text-lg font-medium">{campo.label}</Label>
          {campo.maxSelecoes && (
            <p className="text-sm text-gray-600">Máximo {campo.maxSelecoes} opções</p>
          )}
          <div className="space-y-2">
            {campo.opcoes.map((opcao: string) => {
              const isChecked = Array.isArray(valor) && valor.includes(opcao);
              const canSelect = !campo.maxSelecoes || !Array.isArray(valor) || valor.length < campo.maxSelecoes || isChecked;
              return (
                <div key={opcao} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${campo.nome}-${opcao}`}
                    checked={isChecked}
                    disabled={!canSelect}
                    onCheckedChange={(checked) => {
                      const novoValor = Array.isArray(valor) ? [...valor] : [];
                      if (checked) {
                        novoValor.push(opcao);
                      } else {
                        const index = novoValor.indexOf(opcao);
                        if (index > -1) novoValor.splice(index, 1);
                      }
                      handleInputChange(secaoIndex, campo.nome, novoValor);
                    }}
                  />
                  <Label htmlFor={`${campo.nome}-${opcao}`} className={!canSelect ? 'text-gray-400' : ''}>{opcao}</Label>
                </div>
              );
            })}
          </div>
          {campo.temOutra && Array.isArray(valor) && valor.includes('Outra') && (
            <Input
              placeholder="Especifique..."
              value={respostas[`secao${secaoIndex + 1}`]?.[`${campo.nome}Outra`] || ''}
              onChange={(e) => handleInputChange(secaoIndex, `${campo.nome}Outra`, e.target.value)}
              className="mt-2"
            />
          )}
        </div>
      );
    case 'textarea':
      return (
        <div key={campo.nome} className="space-y-2">
          <Label htmlFor={campo.nome} className="text-lg font-medium">{campo.label}</Label>
          <Textarea
            id={campo.nome}
            value={valor}
            onChange={(e) => handleInputChange(secaoIndex, campo.nome, e.target.value)}
            rows={4}
            className="w-full"
          />
        </div>
      );
    default:
      return null;
  }
}
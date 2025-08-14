import { useState } from 'react';

const Index = () => {
  const handleProsseguir = () => {
    window.location.href = "https://docs.google.com/forms/d/1hBXDxgoyUhHt6JRpRmuOay1frwRsHn_s3hGoz5SuSJ8/viewform?edit_requested=true";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Enquete Nacional: Uso Terapêutico da Cannabis no Brasil
        </h1>
        <p className="mb-4">
          Você ou alguém que você acompanha utiliza produtos à base de cannabis (como CBD, THC, outros canabinoides ou a planta integral) para tratamento de saúde? 
          Sua experiência é fundamental para melhorar o entendimento sobre esses tratamentos no Brasil!
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Por que participar?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Ajude a documentar a evolução dos tratamentos com cannabis ao longo do tempo</li>
          <li>Suas respostas contribuirão para qualificar o atendimento de pacientes, terapeutas e médicos</li>
          <li>Pode ser respondido pelo paciente ou por seu responsável</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Como funciona?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>✔ Responda o formulário online rápido e anônimo</li>
          <li>✔ Pode ser preenchido mais de uma vez para registrar mudanças no tratamento</li>
          <li>✔ Seus dados são confidenciais e usados apenas para fins de pesquisa</li>
        </ul>

        <p className="mb-4">
          A enquete é conduzida por uma equipe multiprofissional de saúde e pesquisa, comprometida com a melhoria dos tratamentos com cannabis no país.
        </p>

        <button
          onClick={handleProsseguir}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
        >
          🔗 Participe agora
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Sua contribuição ajuda a construir um futuro com mais conhecimento e acesso à cannabis terapêutica!
        </p>

        <hr className="my-4" />
        <p className="text-xs text-gray-400">Dados armazenados com segurança | Participação voluntária</p>

        <p className="text-sm text-gray-500 mt-2">Apoio:</p>
      </div>
    </div>
  );
};

export default Index;

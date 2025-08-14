import { useState } from 'react';
import Logo from '../assets/itclogo.png';

const Index = () => {
  const handleProsseguir = () => {
    window.open(
      "https://docs.google.com/forms/d/1hBXDxgoyUhHt6JRpRmuOay1frwRsHn_s3hGoz5SuSJ8/viewform?edit_requested=true",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Enquete Nacional: Uso Terapêutico da Cannabis no Brasil
        </h1>

        <p className="mb-6 text-base sm:text-lg leading-relaxed">
          Você ou alguém que você acompanha utiliza produtos à base de cannabis (como CBD, THC, outros canabinoides ou a planta integral) para tratamento de saúde?
          <br />
          Sua experiência é fundamental para melhorar o entendimento sobre esses tratamentos no Brasil!
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-3">Por que participar?</h2>
        <ul className="list-disc list-inside mb-6 space-y-1 text-base sm:text-lg">
          <li>✔ Ajude a documentar a evolução dos tratamentos com cannabis ao longo do tempo</li>
          <li>✔ Suas respostas contribuirão para qualificar o atendimento de pacientes, terapeutas e médicos</li>
          <li>✔ Pode ser respondido pelo paciente ou por seu responsável</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-3">Como funciona?</h2>
        <ul className="list-disc list-inside mb-6 space-y-1 text-base sm:text-lg">
          <li>✔ Responda o formulário online rápido e anônimo</li>
          <li>✔ Pode ser preenchido mais de uma vez para registrar mudanças no tratamento</li>
          <li>✔ Seus dados são confidenciais e usados apenas para fins de pesquisa</li>
        </ul>

        <p className="mb-6 text-base sm:text-lg">
          A enquete é conduzida por uma equipe multiprofissional de saúde e pesquisa, comprometida com a melhoria dos tratamentos com cannabis no país.
        </p>

        <button
          onClick={handleProsseguir}
          className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition text-lg sm:text-xl font-semibold"
        >
          🔗 Participe agora
        </button>

        <p className="text-sm sm:text-base text-gray-600 mt-6 text-center">
          Sua contribuição ajuda a construir um futuro com mais conhecimento e acesso à cannabis terapêutica!
        </p>

        <hr className="my-6" />
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          Dados armazenados com segurança | Participação voluntária
        </p>

        <p className="text-sm sm:text-base text-gray-500 mt-4 text-center">
          Apoio:
        </p>
             <div className="mt-4 flex justify-center">
          <img
            src={Logo}
            alt="Logo de Apoio"
            className="w-32 sm:w-48 h-auto object-contain"
          />
               <p className="mt-2 text-base sm:text-lg font-semibold text-gray-700 text-center">
    Instituto Terapia Canábica
  </p>
      
        </div>
        
      </div>
    </div>
  );
};

export default Index;

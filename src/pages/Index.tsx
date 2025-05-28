import { useState } from 'react';
import Apresentacao from '../components/Apresentacao';
import ModalTCLE from '../components/ModalTCLE';
import Formulario from '../components/formulario/Formulario';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('apresentacao');
  const [showModal, setShowModal] = useState(false);
  const [respostasFormulario, setRespostasFormulario] = useState({});

  const handleProsseguir = () => {
    setShowModal(true); // Abre o modal
  };

  const handleConsentimento = (concordou: boolean) => {
    setShowModal(false);
    if (concordou) {
      window.location.href = "https://docs.google.com/forms/d/1hBXDxgoyUhHt6JRpRmuOay1frwRsHn_s3hGoz5SuSJ8/viewform?edit_requested=true"; // Substitua pelo link correto do formulário
    }
  };
  

  const handleFinalizarFormulario = (respostas: any) => {
    setRespostasFormulario(respostas);
    setCurrentStep('dashboard');
  };

  const handleVoltarInicio = () => {
    setCurrentStep('apresentacao');
    setRespostasFormulario({});
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'apresentacao':
        return (
          <div className="text-center">
            <Apresentacao onProsseguir={handleProsseguir} />
            
          </div>
        );
      case 'formulario':
        return <Formulario onFinalizar={handleFinalizarFormulario} />;
      case 'dashboard':
        return <Dashboard respostas={respostasFormulario} onVoltarInicio={handleVoltarInicio} />;
      default:
        return <Apresentacao onProsseguir={handleProsseguir} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
      <ModalTCLE isOpen={showModal} onClose={() => setShowModal(false)} onConsentimento={handleConsentimento} />
    </div>
  );
};

export default Index;
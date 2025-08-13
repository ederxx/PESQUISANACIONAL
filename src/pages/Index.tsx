import { useState } from 'react';
import Apresentacao from '../components/Apresentacao';
import Formulario from '../components/formulario/Formulario';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('apresentacao');
  const [respostasFormulario, setRespostasFormulario] = useState({});

  const handleProsseguir = () => {
    window.location.href = "https://docs.google.com/forms/d/1hBXDxgoyUhHt6JRpRmuOay1frwRsHn_s3hGoz5SuSJ8/viewform?edit_requested=true";
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
    </div>
  );
};

export default Index;

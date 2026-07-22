'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { IntakeWizard } from '../components/intake/IntakeWizard';
import { BlueprintViewer } from '../components/blueprint/BlueprintViewer';
import { AgentTimeline } from '../components/timeline/AgentTimeline';
import { CostDashboard } from '../components/dashboard/CostDashboard';
import { GitHubReviewUI } from '../components/github/GitHubReviewUI';
import { CodeViewerUI } from '../components/codes/CodeViewerUI';
import { AutonomousCapabilitiesUI } from '../components/capabilities/AutonomousCapabilitiesUI';
import { AdvancedPlatformUI } from '../components/advanced/AdvancedPlatformUI';
import { RequirementAnalyzerUI } from '../components/requirements/RequirementAnalyzerUI';
import { ArchitectureDesignUI } from '../components/architect/ArchitectureDesignUI';
import { RepoIntelligenceUI } from '../components/repo/RepoIntelligenceUI';
import { MasterOrchestratorUI } from '../components/orchestrator/MasterOrchestratorUI';
import { MasterAIOrchestratorUI } from '../components/orchestrator/MasterAIOrchestratorUI';
import { DevOpsOrchestratorUI } from '../components/devops/DevOpsOrchestratorUI';
import { CTOExecutiveUI } from '../components/cto/CTOExecutiveUI';
import { CompanyLearningUI } from '../components/company/CompanyLearningUI';
import { GoalSimulationUI } from '../components/goal/GoalSimulationUI';
import { StartupBuilderUI } from '../components/startup/StartupBuilderUI';
import { EnterpriseCommandUI } from '../components/enterprise/EnterpriseCommandUI';
import { AIOSKernelUI } from '../components/kernel/AIOSKernelUI';
import { SelfEvolutionUI } from '../components/evolution/SelfEvolutionUI';
import { AutonomousExecutionUI } from '../components/execution/AutonomousExecutionUI';
import { GlobalKnowledgeUI } from '../components/knowledge/GlobalKnowledgeUI';
import { CompanyEcosystemUI } from '../components/company/CompanyEcosystemUI';
import { GrandMasterUI } from '../components/grandmaster/GrandMasterUI';
import { UnifiedIntelligenceUI } from '../components/unified/UnifiedIntelligenceUI';
import { LoginScreen } from '../components/auth/LoginScreen';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('intake');
  const [workflowResult, setWorkflowResult] = useState<any>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('autoengineer_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('autoengineer_auth');
    setIsAuthenticated(false);
  };

  const handleIntakeComplete = (result: any) => {
    setWorkflowResult(result);
    setActiveTab('blueprint');
  };

  const handleOpenHistory = () => {
    setActiveTab('intake');
    setShowHistoryModal(true);
  };

  // Prevent SSR mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }


  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenHistory={handleOpenHistory}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-6">
        {activeTab === 'intake' && (
          <IntakeWizard 
            onComplete={handleIntakeComplete} 
            showHistoryModal={showHistoryModal}
            setShowHistoryModal={setShowHistoryModal}
          />
        )}
        {activeTab === 'requirements' && <RequirementAnalyzerUI workflowResult={workflowResult} />}
        {activeTab === 'architect' && <ArchitectureDesignUI workflowResult={workflowResult} />}
        {activeTab === 'repo' && <RepoIntelligenceUI workflowResult={workflowResult} />}
        {activeTab === 'orchestrator' && <MasterOrchestratorUI />}
        {activeTab === 'ai-orchestrator' && <MasterAIOrchestratorUI />}
        {activeTab === 'devops' && <DevOpsOrchestratorUI />}
        {activeTab === 'cto' && <CTOExecutiveUI />}
        {activeTab === 'company' && <CompanyLearningUI />}
        {activeTab === 'goal' && <GoalSimulationUI />}
        {activeTab === 'startup' && <StartupBuilderUI />}
        {activeTab === 'enterprise' && <EnterpriseCommandUI />}
        {activeTab === 'kernel' && <AIOSKernelUI />}
        {activeTab === 'evolution' && <SelfEvolutionUI />}
        {activeTab === 'execution' && <AutonomousExecutionUI />}
        {activeTab === 'knowledge' && <GlobalKnowledgeUI />}
        {activeTab === 'company-ecosystem' && <CompanyEcosystemUI />}
        {activeTab === 'grandmaster' && <GrandMasterUI />}
        {activeTab === 'unified' && <UnifiedIntelligenceUI />}
        {activeTab === 'blueprint' && <BlueprintViewer workflowResult={workflowResult} />}
        {activeTab === 'codes' && <CodeViewerUI workflowResult={workflowResult} />}
        {activeTab === 'advanced' && <AdvancedPlatformUI />}
        {activeTab === 'capabilities' && <AutonomousCapabilitiesUI />}
        {activeTab === 'timeline' && <AgentTimeline workflowResult={workflowResult} />}
        {activeTab === 'dashboard' && <CostDashboard />}
        {activeTab === 'github' && <GitHubReviewUI />}
      </div>
    </main>
  );
}

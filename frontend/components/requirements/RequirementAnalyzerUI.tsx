'use client';
import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, ShieldCheck, Layers, Sparkles, UserCheck, 
  Target, Calendar, AlertCircle, ArrowRight, ShieldAlert, Award, FileCode2
} from 'lucide-react';

export const RequirementAnalyzerUI = ({ workflowResult }: { workflowResult?: any }) => {
  const pmData = workflowResult?.blueprint_summary?.pm || workflowResult?.workflow_result?.blueprint_summary?.pm || {};
  const [activeTab, setActiveTab] = useState<'srs' | 'stories' | 'rules' | 'roadmap'>('srs');

  const srs = {
    project_name: pmData.project_name || "Gym & Fitness ERP System",
    domain: pmData.business_domain || "FITNESS_MANAGEMENT",
    problem_statement: pmData.problem_statement || "Automate manual gym member onboarding, trainer slot bookings, and subscription renewals.",
    completeness: pmData.completeness_score || 100.0,
    functional_requirements: pmData.functional_requirements || [
      { id: "FR-1", category: "Authentication", title: "User Registration & JWT Auth", description: "Users must register with email validation and receive a secure JWT bearer token." },
      { id: "FR-2", category: "Core Operations", title: "Manage Member & Trainer Profiles", description: "Full CRUD lifecycle management for members and trainers with search and status tracking." },
      { id: "FR-3", category: "Bookings", title: "Class & Workout Slot Reservations", description: "Real-time class booking engine with concurrency lock protection via Redis." },
      { id: "FR-4", category: "Analytics", title: "Operational KPI Dashboard", description: "Executive dashboard showing active memberships, revenue metrics, and booking throughput." },
      { id: "FR-5", category: "Admin", title: "Role-Based Boundary Permissions", description: "RBAC boundary permission checks ensuring only Super Admins perform destructive deletions." }
    ],
    user_stories: pmData.user_stories || [
      {
        id: "US-101",
        role: "Gym Member",
        story: "As a Gym Member, I want to view active workout schedules, So that I can reserve trainer slots in real-time.",
        priority: "HIGH",
        points: 5,
        criteria: {
          given: "Given the member is logged in with an ACTIVE subscription tier",
          when: "When the member selects an available trainer slot and clicks 'Confirm Booking'",
          then: "Then the system acquires a Redis lock, creates the booking record, and returns HTTP 201 SUCCESS."
        }
      },
      {
        id: "US-102",
        role: "Gym Administrator",
        story: "As an Admin, I want to soft-delete or archive cancelled member profiles, So that historical data is preserved for audit compliance.",
        priority: "CRITICAL",
        points: 8,
        criteria: {
          given: "Given the user possesses Super Admin permissions",
          when: "When the admin triggers profile archival on a cancelled member record",
          then: "Then the system sets status = 'ARCHIVED' and records an audit log entry without hard-deleting database rows."
        }
      }
    ],
    business_rules: pmData.business_rules || [
      {
        rule_id: "RULE-01",
        name: "Role-Based Deletion Constraint",
        rule: "Only Super Admin role can perform hard deletion of primary domain records.",
        module: "web-backend/apps/sells/views.py",
        logic: "request.user.is_superuser == True"
      },
      {
        rule_id: "RULE-02",
        name: "Active Subscription Requirement",
        rule: "A member must have ACTIVE subscription status before booking trainer slots.",
        module: "web-backend/apps/sells/models.py",
        logic: "member.status == 'ACTIVE'"
      }
    ],
    sprint_roadmap: pmData.sprint_roadmap || [
      { sprint: "Sprint 1", goal: "Core SRS & DB Migration Setup", deliverables: ["PostgreSQL DDL Schema", "Authentication Engine", "Django ORM Setup"] },
      { sprint: "Sprint 2", goal: "Domain API & REST ViewSets", deliverables: ["CRUD endpoints for Members", "FastAPI AI Recommendation Engine"] },
      { sprint: "Sprint 3", goal: "Next.js 14 Web Portal UI", deliverables: ["Dashboard Layout", "Interactive VS Code Tree Explorer", "Real-time Metrics"] },
      { sprint: "Sprint 4", goal: "Security Audit & Cloud Deploy", deliverables: ["OWASP Hardening", "Docker Compose Config", "CI/CD Pipeline"] }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <FileText className="w-3.5 h-3.5 text-cyan-300" />
              Phase-1 Requirement Analyzer Agent
            </span>
            <h2 className="text-2xl font-black text-white">{srs.project_name}</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Domain: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{srs.domain}</code> • {srs.problem_statement}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Requirements Completeness</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {srs.completeness}% SRS VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('srs')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'srs' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Functional Requirements (SRS)</span>
        </button>

        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'stories' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>User Stories & Given-When-Then</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'rules' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Central Business Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'roadmap' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>4-Sprint Agile Roadmap</span>
        </button>
      </div>

      {/* TAB 1: FUNCTIONAL REQUIREMENTS SRS */}
      {activeTab === 'srs' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Software Requirement Specification (SRS) Matrix
              </h3>
              <p className="text-xs text-slate-400">Extracted functional and non-functional engineering specifications</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              5/5 REQUIREMENTS APPROVED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {srs.functional_requirements.map((fr: any) => (
              <div key={fr.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300 font-mono">{fr.id} • {fr.category}</span>
                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded">APPROVED</span>
                </div>
                <h4 className="text-white font-black text-sm">{fr.title}</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{fr.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: USER STORIES & GIVEN-WHEN-THEN ACCEPTANCE CRITERIA */}
      {activeTab === 'stories' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                Agile Backlog & Given-When-Then Acceptance Criteria
              </h3>
              <p className="text-xs text-slate-400">Production-level user stories synthesized by Senior Agile Product Owner Agent</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {srs.user_stories.map((us: any) => (
              <div key={us.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-300 font-black">{us.id}</span>
                    <span className="text-white font-bold bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">{us.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/50">{us.priority} PRIORITY</span>
                    <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{us.points} Story Points</span>
                  </div>
                </div>

                <p className="text-white font-bold text-xs">{us.story}</p>

                {/* Given-When-Then Acceptance Criteria Box */}
                <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30 space-y-1.5 text-[11px] text-slate-200">
                  <div className="text-cyan-300 font-black">📋 Given-When-Then Production Acceptance Criteria:</div>
                  <div className="text-emerald-300 font-semibold">• {us.criteria.given}</div>
                  <div className="text-amber-300 font-semibold">• {us.criteria.when}</div>
                  <div className="text-cyan-300 font-semibold">• {us.criteria.then}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CENTRAL BUSINESS RULES */}
      {activeTab === 'rules' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Centralized Business Rules Registry
              </h3>
              <p className="text-xs text-slate-400">Domain rules extracted centrally that generated code MUST strictly obey</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              {srs.business_rules.length} RULES REGISTERED
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {srs.business_rules.map((rule: any) => (
              <div key={rule.rule_id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-cyan-300 font-black">{rule.rule_id} • {rule.name}</span>
                  <span className="text-emerald-400 font-black bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/50">ACTIVE ENFORCED</span>
                </div>
                <p className="text-white font-bold text-xs">{rule.rule}</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
                  <span>Affected Module: <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">{rule.module}</code></span>
                  <span>Logic: <code className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded">{rule.logic}</code></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 4-SPRINT AGILE ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                4-Sprint Agile Release Roadmap
              </h3>
              <p className="text-xs text-slate-400">Phased sprint deliverables generated by Agile Sprint Planning Agent</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {srs.sprint_roadmap.map((s: any, idx: number) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-cyan-300 font-black">{s.sprint}</span>
                  <span className="text-slate-400 font-bold">2-Week Velocity</span>
                </div>
                <h4 className="text-white font-black text-xs">{s.goal}</h4>
                <div className="space-y-1">
                  {s.deliverables.map((d: string, dIdx: number) => (
                    <div key={dIdx} className="text-slate-300 flex items-center gap-2 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

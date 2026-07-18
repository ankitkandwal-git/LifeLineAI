import React from "react";
import EmergencyActions from './EmergencyAction';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Hospital,
  Info,
  ClipboardList,
  Ban,
  Building,
  Activity
} from "lucide-react";

const EmergencyPanel = ({ data }) => {
  const getSeverityStyles = (level) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
          dot: "bg-emerald-500"
        };
      case "MEDIUM":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
          dot: "bg-amber-500"
        };
      case "HIGH":
        return {
          bg: "bg-orange-50 text-orange-700 border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30",
          dot: "bg-orange-500"
        };
      case "CRITICAL":
        return {
          bg: "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/25 dark:text-red-400 dark:border-red-900/40 animate-pulse",
          dot: "bg-red-500"
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200/50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800",
          dot: "bg-slate-500"
        };
    }
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50 border border-dashed border-slate-250 dark:border-slate-800 dark:bg-slate-900/30 rounded-3xl min-h-[300px] text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-850 dark:text-slate-650 mb-4">
          <Activity size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-850 dark:text-slate-200">No result yet</h3>
        <p className="mt-1.5 text-xs text-slate-450 dark:text-slate-500 max-w-[220px] leading-relaxed">
          Send a message to see the summary here.
        </p>
      </div>
    );
  }

  const firstAidItems = Array.isArray(data.firstAid) ? data.firstAid : [];
  const doNotDoItems = Array.isArray(data.dontDo)
    ? data.dontDo
    : Array.isArray(data.DoRemember)
      ? data.DoRemember
      : [];

  const severityStyle = getSeverityStyles(data.severity);

  const SectionCard = ({ title, children, icon: Icon, colorClass = "text-slate-600" }) => (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="flex items-center gap-2.5 mb-3 text-sm font-bold text-slate-850 dark:text-slate-200">
        {Icon && <Icon className={colorClass} size={18} />}
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col w-full p-6 bg-slate-50/40 dark:bg-slate-950/20 border border-slate-200/60 dark:border-slate-850/60 rounded-3xl gap-5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/40 dark:border-slate-800/40">
        <Activity className="text-blue-600" size={22} />
        <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
          Summary
        </h2>
      </div>

      {/* Severity Badge */}
      <div className={`flex items-center justify-between border px-4 py-3 rounded-2xl ${severityStyle.bg}`}>
        <span className="text-xs font-black uppercase tracking-wider">Emergency Severity</span>
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
          <span className={`h-2.5 w-2.5 rounded-full ${severityStyle.dot} inline-block`}></span>
          {data.severity}
        </span>
      </div>

      {/* Summary Card */}
      <SectionCard title="Summary" icon={Info} colorClass="text-blue-500">
        <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-400 font-medium">{data.summary}</p>
      </SectionCard>

      {/* First Aid Instructions */}
      {firstAidItems.length > 0 && (
        <SectionCard title="First aid" icon={ClipboardList} colorClass="text-emerald-500">
          <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 font-medium">
            {firstAidItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <CheckCircle className="flex-shrink-0 text-emerald-500 mt-0.5" size={15} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Do Not Do Constraints */}
      {doNotDoItems.length > 0 && (
        <SectionCard title="Avoid" icon={Ban} colorClass="text-red-500">
          <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 font-medium">
            {doNotDoItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <XCircle className="flex-shrink-0 text-red-500 mt-0.5" size={15} />
                <span className="text-red-700 dark:text-red-400">{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Recommended Department */}
      <SectionCard title="Department" icon={Hospital} colorClass="text-blue-500">
        <p className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800">
          <Building className="text-blue-500" size={16} />
          {data.department}
        </p>
      </SectionCard>

      {/* Ambulance & Nearby Hospitals actions */}
      <EmergencyActions severity={data.severity} />
    </div>
  );
};

export default EmergencyPanel;
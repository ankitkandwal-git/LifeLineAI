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
} from "lucide-react";

const EmergencyPanel = ({ data }) => {
  const getSeverityColor = (level) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return "bg-green-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "HIGH":
        return "bg-orange-500";
      case "CRITICAL":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  if (!data) {
    return (
      <div className="max-w-md p-6 mx-auto my-8 bg-white border shadow-lg rounded-2xl border-slate-200">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Emergency Command Center
        </h2>

        <p className="text-center text-gray-500">
          Send a message to receive emergency analysis.
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

  const Card = ({ title, children, icon: Icon, colorClass = "text-slate-600" }) => (
    <div className="p-5 transition-all duration-300 bg-white border shadow-lg rounded-xl border-slate-200 hover:shadow-xl">
      <h3 className="flex items-center mb-3 text-xl font-semibold text-slate-800">
        {Icon && <Icon className={`mr-3 ${colorClass}`} size={24} />}
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full p-6 bg-white border shadow-xl rounded-2xl border-slate-200">
      <h2 className="mb-4 text-3xl font-bold text-center text-slate-800">
        Emergency Command Center
      </h2>

      <div className="flex-1 pr-2 -mr-2 overflow-y-auto"> {/* Internal scrolling */}
        {/* Severity Card */}
        <Card
          title="Emergency Severity"
          icon={AlertTriangle}
          colorClass={data.severity === "CRITICAL" ? "text-red-600" : "text-orange-500"}
        >
          <div
            className={`p-3 rounded-lg text-center text-white font-bold text-lg ${getSeverityColor(
              data.severity
            )}`}
          >
            {data.severity}
          </div>
        </Card>
        
        {/* Summary Card */}
        <Card title="Emergency Summary" icon={Info} colorClass="text-blue-500">
          <p className="text-base text-slate-700">{data.summary}</p>
        </Card>
        
        {/* First Aid Card */}
        <Card title="Immediate First Aid" icon={ClipboardList} colorClass="text-emerald-500">
          <ul className="space-y-2 text-base text-slate-700">
            {firstAidItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="flex-shrink-0 mt-1 mr-2 text-emerald-500" size={18} />
                <span>{item}</span> 
              </li>
            ))}
          </ul>
        </Card>
        
        {/* Don't Do Card */}
        <Card title="Do Not Do" icon={Ban} colorClass="text-red-500">
          <ul className="space-y-2 text-base text-slate-700">
            {doNotDoItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <XCircle className="flex-shrink-0 mt-1 mr-2 text-red-500" size={18} />
                <span>{item}</span> 
              </li>
            ))}
          </ul>
        </Card>
        
        {/* Department Card */}
        <Card title="Recommended Department" icon={Hospital} colorClass="text-blue-500">
          <p className="flex items-center text-base text-slate-700">
            <Building className="mr-2 text-blue-500" size={18} />
            {data.department} 
          </p>
        </Card>
        <EmergencyActions severity={data.severity} />
      </div>
    </div>
  );
};

export default EmergencyPanel;
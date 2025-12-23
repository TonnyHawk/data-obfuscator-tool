import { Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { ObfuscationMapping } from '../utils/obfuscation';

interface MappingTableProps {
  mappings: ObfuscationMapping[];
  onClear: () => void;
}

export function MappingTable({ mappings, onClear }: MappingTableProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const typeColors: Record<string, string> = {
    name: 'bg-purple-100 text-purple-800',
    email: 'bg-blue-100 text-blue-800',
    phone: 'bg-green-100 text-green-800',
    ssn: 'bg-red-100 text-red-800',
    credit_card: 'bg-orange-100 text-orange-800',
    address: 'bg-yellow-100 text-yellow-800',
    date: 'bg-cyan-100 text-cyan-800',
    number: 'bg-pink-100 text-pink-800',
    custom: 'bg-indigo-100 text-indigo-800',
  };

  const typeLabels: Record<string, string> = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    ssn: 'SSN',
    credit_card: 'Credit Card',
    address: 'Address',
    date: 'Date',
    number: 'ID Number',
    custom: 'Custom',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-white">Obfuscation Mapping</h2>
          <p className="text-slate-300 text-sm">
            {mappings.length} sensitive item{mappings.length !== 1 ? 's' : ''} detected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
          >
            {showOriginal ? (
              <>
                <EyeOff size={16} />
                Hide
              </>
            ) : (
              <>
                <Eye size={16} />
                Show
              </>
            )}
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Placeholder</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Original Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mappings.map((mapping, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${typeColors[mapping.type]}`}>
                    {typeLabels[mapping.type]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                    {mapping.placeholder}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {showOriginal ? (
                    <span className="text-sm text-slate-900">{mapping.original}</span>
                  ) : (
                    <span className="text-sm text-slate-400">••••••••</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  FileText, 
  Loader2, 
  Unlock, 
  ChevronDown, 
  CheckSquare,
  Square
} from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';

interface DocumentItem {
  id: string;
  name: string;
  filename: string;
  path: string;
  size: string;
  category: 'Academics' | 'Certificates' | 'Identity' | 'Receipts';
}

const DOCUMENTS: DocumentItem[] = [
  // Academics
  { id: 'ssc_marksheet', name: 'SSC Marksheet', filename: 'SSC_marksheet.pdf', path: '/Gaurav/SSC_marksheet.pdf', size: '159 KB', category: 'Academics' },
  { id: 'hsc_marksheet', name: 'HSC Marksheet', filename: 'Hsc__marksheet.pdf', path: '/Gaurav/Hsc__marksheet.pdf', size: '171 KB', category: 'Academics' },
  { id: 'fe_marksheet', name: 'FE Marksheet', filename: 'FE_marksheet.pdf', path: '/Gaurav/FE_marksheet.pdf', size: '204 KB', category: 'Academics' },
  { id: 'se_marksheet', name: 'SE Marksheet', filename: 'SE_Marksheet.pdf', path: '/Gaurav/SE_Marksheet.pdf', size: '142 KB', category: 'Academics' },
  { id: 'leaving_cert', name: 'Leaving Certificate', filename: 'Leaving_Certificate.pdf', path: '/Gaurav/Leaving_Certificate.pdf', size: '113 KB', category: 'Academics' },
  { id: 'leaving_gap', name: 'Leaving / Gap Certificate', filename: 'Leaving+Gap.pdf', path: '/Gaurav/Leaving+Gap.pdf', size: '149 KB', category: 'Academics' },
  
  // Certificates & Declarations
  { id: 'caste_cert', name: 'Caste Certificate', filename: 'Caste_Certificate.pdf', path: '/Gaurav/Caste_Certificate.pdf', size: '136 KB', category: 'Certificates' },
  { id: 'caste_validity', name: 'Caste Validity', filename: 'Caste_Validity.pdf', path: '/Gaurav/Caste_Validity.pdf', size: '239 KB', category: 'Certificates' },
  { id: 'domicile', name: 'Domicile Certificate', filename: 'Domicile_certificate.pdf', path: '/Gaurav/Domicile_certificate.pdf', size: '105 KB', category: 'Certificates' },
  { id: 'nationality', name: 'Nationality Certificate', filename: 'Nationality.pdf', path: '/Gaurav/Nationality.pdf', size: '102 KB', category: 'Certificates' },
  { id: 'non_creamy', name: 'Non Creamy Layer', filename: 'Non_creamy_layer.pdf', path: '/Gaurav/Non_creamy_layer.pdf', size: '189 KB', category: 'Certificates' },
  { id: 'declaration', name: 'Declaration Statement', filename: 'Declaration.pdf', path: '/Gaurav/Declaration.pdf', size: '114 KB', category: 'Certificates' },
  { id: 'income_cert', name: 'Income Certificate 2023-24', filename: 'Income23-24.pdf', path: '/Gaurav/Income23-24.pdf', size: '122 KB', category: 'Certificates' },

  // Identity & Photos
  { id: 'passport_photo', name: 'Passport Size Photo', filename: 'Passportsize.jpeg', path: '/Gaurav/Passportsize.jpeg', size: '89 KB', category: 'Identity' },
  { id: 'ration_card', name: 'Ration Card', filename: 'Ration_Cardd.pdf', path: '/Gaurav/Ration_Cardd.pdf', size: '184 KB', category: 'Identity' },

  // Receipts & Acknowledgments
  { id: 'acknowledgment', name: 'Acknowledgment Receipt', filename: 'Acknowledgmentt.pdf', path: '/Gaurav/Acknowledgmentt.pdf', size: '174 KB', category: 'Receipts' },
  { id: 'branch_change', name: 'Ack & Branch Change Letter', filename: 'Ack+Branch_change.pdf', path: '/Gaurav/Ack+Branch_change.pdf', size: '226 KB', category: 'Receipts' },
  { id: 'fee_receipt_24_25', name: 'Fee Receipt 2024-25', filename: 'Fee_receipt24-25.pdf', path: '/Gaurav/Fee_receipt24-25.pdf', size: '107 KB', category: 'Receipts' },
  { id: 'fee_receipt_25_26', name: 'Fee Receipt 2025-26', filename: 'Fee_Receipt25-26.pdf', path: '/Gaurav/Fee_Receipt25-26.pdf', size: '83 KB', category: 'Receipts' },
];

export default function SecureDocumentVault() {
  const { isTerminalOpen } = useTerminal();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Academics' | 'Certificates' | 'Identity' | 'Receipts'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [dropdownVal, setDropdownVal] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger file download
  const triggerDownload = (path: string, filename: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle single file download with animation
  const handleDownload = async (doc: DocumentItem) => {
    if (downloadingId) return;
    setDownloadingId(doc.id);
    setDownloadProgress(0);

    // Simulated decryption/download progress
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 80));
      setDownloadProgress(i * 10);
    }

    triggerDownload(doc.path, doc.filename);
    
    // Toast notification
    setToastMessage(`✓ ${doc.name} downloaded successfully!`);
    setTimeout(() => setToastMessage(null), 3000);
    
    setDownloadingId(null);
    setDownloadProgress(0);
  };

  // Dropdown quick download handler
  const handleDropdownSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDropdownVal(val);
    if (!val) return;

    const doc = DOCUMENTS.find(d => d.id === val);
    if (doc) {
      handleDownload(doc);
    }
    // Reset dropdown
    setDropdownVal('');
  };

  // Handle multi-select toggle
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Batch download selected files
  const handleBatchDownload = async () => {
    if (selectedIds.length === 0) return;
    
    setToastMessage(`Downloading ${selectedIds.length} selected files...`);
    
    // Download them sequentially with a small delay to avoid browser blocking
    for (const id of selectedIds) {
      const doc = DOCUMENTS.find(d => d.id === id);
      if (doc) {
        triggerDownload(doc.path, doc.filename);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setTimeout(() => setToastMessage(null), 3000);
    setSelectedIds([]);
  };

  // Filter documents
  const filteredDocs = DOCUMENTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });  return (
    <div className="w-full font-mono text-left bg-black/5 dark:bg-zinc-950/40 border border-emerald-600/20 dark:border-emerald-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-md">
      {/* Vault Header */}
      <div className={`flex flex-col ${isTerminalOpen ? 'xl:flex-row xl:items-center' : 'sm:flex-row sm:items-center'} justify-between gap-4 border-b border-emerald-600/10 dark:border-emerald-500/10 pb-4 mb-6`}>
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base mb-1">
            <Unlock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>ROOT_SECURE_DOCUMENT_VAULT.sh</span>
          </div>
          <p className="text-xs text-gray-650 dark:text-gray-400">19 Encrypted administrative documents active. Decryption keys online.</p>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1 bg-emerald-600/10 dark:bg-emerald-500/10 border border-emerald-600/20 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-500 text-[10px] font-bold uppercase rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-ping" />
          SESSION_ROOT_GRANTED
        </div>
      </div>

      {/* Selector Dropdown: "after selecting, it should auto download" */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
          &gt; SELECT DOCUMENT FOR AUTO-DOWNLOAD:
        </label>
        <div className="relative">
          <select
            value={dropdownVal}
            onChange={handleDropdownSelect}
            className="w-full bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 hover:border-emerald-600/40 dark:hover:border-emerald-500/40 rounded-lg py-2.5 pl-3 pr-10 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">-- Choose document to auto-download --</option>
            {DOCUMENTS.map(doc => (
              <option key={doc.id} value={doc.id} className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
                [{doc.category.toUpperCase()}] {doc.name} ({doc.size})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-border/60 dark:border-border/40 pb-2 overflow-x-auto">
          {(['All', 'Academics', 'Certificates', 'Identity', 'Receipts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-emerald-600/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-600/35 dark:border-emerald-500/35'
                  : 'text-gray-550 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-transparent'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Input & Multi Action */}
        <div className={`flex flex-col ${isTerminalOpen ? 'xl:flex-row xl:items-center' : 'sm:flex-row sm:items-center'} gap-3`}>
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search secure documents..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 dark:bg-zinc-900/60 border border-border dark:border-zinc-800/80 focus:border-emerald-600/40 dark:focus:border-emerald-500/40 rounded-lg py-2 pl-9 pr-4 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
            />
          </div>
          
          {/* Multi-download action button */}
          {selectedIds.length > 0 && (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleBatchDownload}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-black font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/10 dark:shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Download {selectedIds.length} Selected
            </motion.button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-emerald-600/10 dark:bg-emerald-500/10 border border-emerald-600/30 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Documents Grid */}
      <div className={`grid gap-3 ${
        isTerminalOpen 
          ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map(doc => {
            const isSelected = selectedIds.includes(doc.id);
            const isDownloading = downloadingId === doc.id;
            
            return (
              <div
                key={doc.id}
                onClick={() => handleDownload(doc)}
                className={`relative flex flex-col justify-between p-3.5 rounded-lg border bg-white/60 dark:bg-zinc-950/60 transition-all duration-200 select-none cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-600/50 dark:border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.04)] dark:shadow-[0_0_12px_rgba(16,185,129,0.06)]' 
                    : 'border-border/80 dark:border-border/40 hover:border-emerald-600/35 dark:hover:border-emerald-500/35'
                }`}
              >
                {/* File Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5">
                    <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`} />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug truncate">
                        {doc.name}
                      </h4>
                      <p className="text-[10px] text-gray-550 dark:text-gray-450 truncate">{doc.filename}</p>
                    </div>
                  </div>

                  {/* Multi-select checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(doc.id);
                    }}
                    className="text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer p-0.5"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* File Footer */}
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-border/50 dark:border-border/20 text-[10px]">
                  <span className="text-gray-500 dark:text-gray-400">{doc.size}</span>
                  
                  {isDownloading ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{downloadProgress}%</span>
                    </div>
                  ) : (
                    <div className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 font-bold">
                      <Download className="w-3 h-3" />
                      <span>GET</span>
                    </div>
                  )}
                </div>

                {/* Individual loading bar overlay */}
                {isDownloading && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-900 rounded-b-lg overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-100" 
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-xs text-gray-550 dark:text-gray-400">
            No matching decrypted files found.
          </div>
        )}
      </div>
    </div>
  );
}

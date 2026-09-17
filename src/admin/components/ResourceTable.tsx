// ResourceTable generik ala Filament: kartu ber-header, tabel strip halus,
// sorting klik header, aksi Edit/Delete per baris, modal konfirmasi hapus.
import { useMemo, useState } from 'react';
import { Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { ResourceConfig } from '../resources/types';

interface Props<T extends { id: string }> {
  config: ResourceConfig<T>;
  rows: T[];
  loading?: boolean;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  toolbar?: React.ReactNode;
}

export default function ResourceTable<T extends { id: string }>({
  config,
  rows,
  loading,
  onEdit,
  onDelete,
  toolbar,
}: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [deleting, setDeleting] = useState<T | null>(null);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = String((a as Record<string, unknown>)[sortKey] ?? '');
      const bv = String((b as Record<string, unknown>)[sortKey] ?? '');
      return av.localeCompare(bv) * (sortDir === 'asc' ? 1 : -1);
    });
  }, [rows, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="adm-card">
        <div className="adm-card-header">
          <h1 className="adm-card-title text-base">{config.name}</h1>
          <div className="flex items-center gap-2">{toolbar}</div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                {config.columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="cursor-pointer select-none hover:text-charcoal"
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : null}
                    </span>
                  </th>
                ))}
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="py-10 text-center text-gray-400">
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-500 align-middle" />
                    Memuat…
                  </td>
                </tr>
              )}
              {!loading && sorted.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="py-10 text-center text-gray-400">
                    Belum ada data.
                  </td>
                </tr>
              )}
              {sorted.map((row) => (
                <tr key={row.id}>
                  {config.columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="whitespace-nowrap text-right">
                    <button onClick={() => onEdit(row)} className="adm-btn-ghost px-2 py-1.5" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleting(row)}
                      className="adm-btn-ghost px-2 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleting && (
        <div className="adm-modal-overlay" onClick={() => setDeleting(null)}>
          <div className="adm-modal max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Hapus {config.name}?</h2>
            </div>
            <div className="adm-modal-body text-sm text-gray-600">
              Data yang dihapus tidak bisa dikembalikan.
            </div>
            <div className="adm-modal-footer">
              <button onClick={() => setDeleting(null)} className="adm-btn-secondary">
                Batal
              </button>
              <button
                onClick={() => {
                  onDelete(deleting);
                  setDeleting(null);
                }}
                className="adm-btn bg-red-600 text-white hover:bg-red-700"
              >
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
